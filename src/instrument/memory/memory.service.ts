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
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user/user.schema';

@Injectable()
export class MemoryService {
  constructor(
    private instrumentService: InstrumentService,
    private userService: UserService,
    @InjectModel(Memory.name) private memoryModel: Model<Memory>,
  ) {}

  /**
   * Find all memories of instrument
   * @param instrumentId
   */
  async findAll(instrumentId: string): Promise<Memory[]> {
    const instrument = await this.instrumentService.findOne(instrumentId);
    return instrument.memories;
  }

  /**
   * Find memory with id
   * @param id
   */
  findOne(id: string): Promise<Memory> {
    return this.memoryModel.findOne({ id }).exec();
  }

  /**
   * Create new memory associated to instrument
   * @param userId
   * @param instrument
   * @param createMemoryDto
   */
  async create(
    userId: Schema.Types.ObjectId,
    instrument: string,
    createMemoryDto: CreateMemoryDto,
  ): Promise<Memory> {
    const { withUsers } = createMemoryDto;
    const users = (await this.userService.findUsers(withUsers)).map(
      (u) => u._id,
    );

    const memory = await this.memoryModel.create({
      ...createMemoryDto,
      createdBy: userId,
      withUsers: users,
    });
    await this.instrumentService.addMemory(instrument, memory);

    return memory;
  }

  /**
   * Update memory if user is owner
   * @param id
   * @param user
   * @param updateMemoryDto
   */
  async update(
    id: string,
    user: User,
    updateMemoryDto: UpdateMemoryDto,
  ): Promise<Memory> {
    const memory = await this.findOne(id);
    const instrument = await this.instrumentService.findOne(id);
    const withUsers = (
      await this.userService.findUsers(updateMemoryDto.withUsers)
    ).map((u) => u._id);
    if (!memory) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }

    delete updateMemoryDto.withUsers;

    return this.memoryModel
      .findOneAndUpdate(
        { id },
        {
          ...updateMemoryDto,
          withUsers,
        },
        { new: true },
      )
      .exec();
  }

  /**
   * Remove from instrument array
   * @param user
   * @param id
   * @param instrumentId
   */
  async remove(user: User, id: string, instrumentId: string) {
    const instrument = await this.instrumentService.findOne(instrumentId);

    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }

    // @ts-ignore
    const index = instrument.memories.findIndex((m) => m._id.equals(id));
    instrument.memories.splice(index, 1);
    instrument.markModified('memories');
    await instrument.save();

    return this.memoryModel.findOneAndDelete({ id });
  }
}
