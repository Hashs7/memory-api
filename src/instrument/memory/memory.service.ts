import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './memory.schema';
import { InstrumentService } from '../instrument.service';
import { UserService } from '../../user/user.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user/user.schema';
import { ContentType, MemoryContent } from './content/content.schema';
import * as shortid from 'shortid';

import { Instrument } from '../instrument.schema';
import { CategoryService } from './category/category.service';
import { File } from '../../file/file.schema';

@Injectable()
export class MemoryService {
  constructor(
    private instrumentService: InstrumentService,
    private userService: UserService,
    private categoryService: CategoryService,
    @InjectModel(Memory.name) private memoryModel: Model<Memory>,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
    @InjectModel(MemoryContent.name)
    private memoryContentModel: Model<MemoryContent>,
  ) {}

  /**
   * Find all memories of instrument
   * @param instrumentId
   * @param user
   */
  async findAll(instrumentId: string, user?: User): Promise<Memory[]> {
    const instrument = await this.instrumentService.findOnePopulate(
      instrumentId,
      user,
    );
    return instrument.memories;
  }

  /**
   * Find memory with id
   * @param id
   */
  async findOne(id: string): Promise<Memory> {
    const memory = await this.memoryModel.findOne({ id }).populate([
      {
        path: 'contents',
        populate: {
          path: 'file',
          model: File.name,
        },
      },
    ]);
    memory.contents = memory.contents.map((c) => {
      if (c.type !== ContentType.Text) {
        c.file?.rewritePath();
      }
      return c;
    });
    return memory;
  }

  /**
   * Create new memory associated to instrument
   * @param userId
   * @param instrument
   * @param createMemoryDto
   */
  async create(
    userId: User,
    instrument: string,
    createMemoryDto: CreateMemoryDto,
  ): Promise<Memory> {
    const shortId = shortid.generate();
    const { withUsers } = createMemoryDto;
    const users = (await this.userService.findUsers(withUsers)).map(
      (u) => u._id,
    );

    const categories = (
      await this.categoryService.findCategories(createMemoryDto.categories)
    ).map((u) => u._id);

    const contents = await Promise.all(
      createMemoryDto.contents.map((c) =>
        this.memoryContentModel.create({ ...c }),
      ),
    );

    const memory = await this.memoryModel.create({
      ...createMemoryDto,
      id: shortId,
      createdBy: userId,
      categories: categories,
      withUsers: users,
      contents,
    });
    await this.instrumentService.addMemory(instrument, memory);

    return memory;
  }

  /**
   * Update memory if user is owner
   * @param id
   * @param user
   * @param instrumentId
   * @param updateMemoryDto
   */
  async update(
    id: string,
    user: User,
    instrumentId: string,
    updateMemoryDto: UpdateMemoryDto,
  ): Promise<Memory> {
    const memory = await this.memoryModel.findOne({ id });
    const withUsers = (
      await this.userService.findUsers(updateMemoryDto.withUsers)
    ).map((u) => u._id);

    const categories = (
      await this.categoryService.findCategories(updateMemoryDto.categories)
    ).map((u) => u._id);

    if (!memory) {
      throw new NotFoundException("Le souvenir n'existe pas");
    }

    if (!user._id.equals(memory.createdBy)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }

    const updatedMemory = await this.memoryModel
      .findOneAndUpdate(
        { id: id },
        {
          ...updateMemoryDto,
          withUsers,
          categories,
        },
        {
          new: true,
          returnOriginal: false,
          useFindAndModify: false,
        },
      )
      .exec();

    await this.instrumentModel
      .findOneAndUpdate(
        {
          id: instrumentId,
          'memories.id': id,
        },
        {
          $set: {
            'memories.$': updatedMemory,
          },
        },
        {
          useFindAndModify: false,
        },
      )
      .exec();

    // delete updateMemoryDto.withUsers;

    return updatedMemory;
  }

  /**
   * Remove from instrument array
   * @param user
   * @param id
   * @param instrumentId
   */
  async remove(user: User, id: string, instrumentId: string) {
    const instrument = await this.instrumentService.findOne(instrumentId);

    const memory = await this.memoryModel.findOne({ id });

    if (!user._id.equals(memory.createdBy)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }

    const index = instrument.memories.findIndex((m) => m.id == id);

    instrument.memories.splice(index, 1);
    instrument.markModified('memories');
    await instrument.save();

    this.memoryModel.findOneAndDelete({ id });

    return instrument;
  }

  search(q: string, categories: Types.ObjectId[]) {
    const filters: any = {};

    if (categories) {
      filters.categories = { $in: categories };
    }
    // @ts-ignore
    return this.memoryModel
      .find({
        $or: [
          {
            name: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },
          {
            description: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },
        ],
        $and: [
          {
            visibility: 'public',
          },
        ],
      })
      .find(filters)
      .limit(10)
      .select('-withUsers -createdAt -updatedAt -contents -template')
      .then((memories) => {
        return Promise.all(
          memories.map(async (m) => {
            const instrument = await this.instrumentService.findByMemory(m.id);
            if (instrument) {
              return {
                ...m.toObject(),
                instrumentId: instrument.id,
              };
            }
          }),
        );
      });
  }
}
