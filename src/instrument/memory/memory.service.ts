import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    @InjectModel(Memory.name) private memoryModel: Model<Memory>
  ) {}

  async create(
    userId: Schema.Types.ObjectId,
    instrument: string,
    createMemoryDto: CreateMemoryDto
  ): Promise<Memory> {
    const { withUsers } = createMemoryDto;
    const users = (await this.userService.findUsers(withUsers))
      .map((u) => u._id);
    console.log('this.memoryModel', this.memoryModel);

    // TODO Fix Subdocument
    // const memory = new Memory(createMemoryDto, userId, users);
    const memory = await this.memoryModel.create({
      ...createMemoryDto,
      createdBy: userId,
      withUsers: users
    });
    console.log(memory);
    await this.instrumentService.addMemory(instrument, memory);

    return memory;
  }

  findAll(): Promise<Memory[]> {
    return this.memoryModel.find().exec();
  }

  findOne(id: string): Promise<Memory> {
    return this.memoryModel.findOne({ id }).exec();
  }

  async update(
    id: string,
    user: User,
    updateMemoryDto: UpdateMemoryDto
  ): Promise<Memory> {
    const memory = await this.findOne(id);
    const instrument = await this.instrumentService.findOne(id);
    const withUsers = (await this.userService.findUsers(updateMemoryDto.withUsers))
      .map((u) => u._id);
    if (!memory) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }

    delete updateMemoryDto.withUsers;

    return this.memoryModel
      .findOneAndUpdate({ id }, {
        ...updateMemoryDto,
        withUsers,
      }, { new: true })
      .exec();
  }

  /**
   * Remove from instrument array
   * @param id
   * @param instrument
   */
  async remove(id: string, instrumentId: string) {
    const instrument = await this.instrumentService.findOne(instrumentId);
    console.log(instrument);
    console.log(instrument.memories);

    const index = instrument.memories.findIndex((m) => m._id.equals(id));
    console.log(index);
    instrument.memories.splice(index, 1);
    instrument.markModified('memories');
    await instrument.save();

    return this.memoryModel.findOneAndDelete({ id });
  }
}
