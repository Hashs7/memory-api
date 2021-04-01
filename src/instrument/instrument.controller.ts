import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../user/user.schema";
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('instrument')
@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get()
  findAll() {
    return this.instrumentService.findAll();
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findForUser(
      @GetUser() user: User,
  ) {
    return this.instrumentService.findForUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create instrument' })
  create(
      @GetUser() user: User,
      @Body() createInstrumentDto: CreateInstrumentDto
  ) {
    return this.instrumentService.create(user, createInstrumentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instrumentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentService.update(id, updateInstrumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrumentService.remove(id);
  }
}
