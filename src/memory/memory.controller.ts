import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './memory.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('memory')
@Controller('memory')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [Memory],
  })
  findAll() {
    return this.memoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  findOne(@Param('id') id: string) {
    return this.memoryService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  @UseGuards(AuthGuard('jwt'))
  create(
    @GetUser() user: User,
    @Body() createMemoryDto: CreateMemoryDto,
  ): Promise<Memory> {
    return this.memoryService.create(user._id, createMemoryDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoryService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoryService.remove(id);
  }
}
