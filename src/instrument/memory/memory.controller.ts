import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './memory.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../user/auth/get-user.decorator';
import { User } from '../../user/user.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('instrument/{id}/memory')
@Controller('instrument/:instrument')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Get('memory')
  @ApiResponse({
    status: 200,
    type: [Memory],
  })
  findAll(
    @Param('instrument') instrument: string,
    @GetUser() user: User,
  ): Promise<Memory[]> {
    return this.memoryService.findAll(instrument, user);
  }

  @Get('memory/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  findOne(@Param('id') id: string): Promise<Memory> {
    return this.memoryService.findOne(id);
  }

  @Post('memory')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  create(
    @GetUser() user: User,
    @Param('instrument') instrument: string,
    @Body(ValidationPipe) createMemoryDto: CreateMemoryDto,
  ): Promise<Memory> {
    return this.memoryService.create(user._id, instrument, createMemoryDto);
  }

  @Patch('memory/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: Memory,
  })
  update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Param('instrument') instrument: string,
    @Body() updateMemoryDto: UpdateMemoryDto,
  ): Promise<Memory> {
    return this.memoryService.update(id, user, instrument, updateMemoryDto);
  }

  @Delete('memory/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @GetUser() user: User,
    @Param('id') id: string,
    @Param('instrument') instrument: string,
  ) {
    return this.memoryService.remove(user, id, instrument);
  }
}
