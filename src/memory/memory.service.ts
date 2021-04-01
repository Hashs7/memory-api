import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './memory.schema';
import { InstrumentService } from '../instrument/instrument.service';
import { UserService } from '../user/user.service';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MemoryService {
  constructor(
    private instrumentService: InstrumentService,
    private userService: UserService,
    @InjectModel(Memory.name) private memoryModel: Model<Memory>
  ) {}

  async create(
    userId: Schema.Types.ObjectId,
    createMemoryDto: CreateMemoryDto
  ): Promise<Memory> {
    const { instrument, withUsers } = createMemoryDto;
    console.log(instrument);
    const users = (await this.userService.findUsers(withUsers))
      .map((u) => u._id);
    console.log(users);

    // TODO Fix Subdocument
    // const memory = new Memory(createMemoryDto, userId, users);
    const memory = await this.memoryModel.create({
      ...createMemoryDto,
      createdBy: userId,
      withUsers: users
    });
    console.log(memory);
    // await memory.save();
    await this.instrumentService.addMemory(instrument, memory);

    return memory;
  }

  findAll() {
    return `This action returns all memory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} memory`;
  }

  update(id: string, updateMemoryDto: UpdateMemoryDto) {
    return `This action updates a #${id} memory`;
  }

  remove(id: string) {
    return `This action removes a #${id} memory`;
  }
}
