import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './memory.schema';
import { InstrumentService } from '../instrument/instrument.service';
import { UserService } from '../user/user.service';
import { Schema as MongooseSchema } from "mongoose";

@Injectable()
export class MemoryService {
  constructor(
    private instrumentService: InstrumentService,
    private userService: UserService,
  ) {}

  async create(
    userId: MongooseSchema.Types.ObjectId,
    createMemoryDto: CreateMemoryDto
  ): Promise<Memory> {
    const { instrument, withUsers } = createMemoryDto;
    const users = (await this.userService.findUsers(withUsers))
      .map((u) => u._id);

    const memory = new Memory(createMemoryDto, userId, users);
    console.log(memory);
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
