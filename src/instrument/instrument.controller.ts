import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../user/user.schema";

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
      @GetUser() user: User,
      @Body() createInstrumentDto: CreateInstrumentDto
  ) {
    return this.instrumentService.create(user, createInstrumentDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  findForUser(
      @GetUser() user: User,
  ) {
    return this.instrumentService.findForUser(user);
  }

  @Get()
  findAll() {
    return this.instrumentService.findAll();
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
