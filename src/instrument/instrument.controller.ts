import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../user/auth/get-user.decorator";
import { User } from "../user/user.schema";
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { Instrument } from './instrument.schema';

@ApiTags('instrument')
@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get()
  @ApiOperation({ summary: 'All public instruments' })
  @ApiResponse({
    status: 200,
    type: [Instrument],
  })
  findAll() {
    return this.instrumentService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Instrument,
  })
  findOne(@Param('id') id: string) {
    return this.instrumentService.findOne(id);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [Instrument],
  })
  findForUser(
      @GetUser() user: User,
  ) {
    return this.instrumentService.findForUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', fileInterceptorOptions),
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create instrument' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Instrument,
  })
  create(
      @GetUser() user: User,
      @Body() createInstrumentDto: CreateInstrumentDto,
      @UploadedFile() file: Express.Multer.File
  ) {
    return this.instrumentService.create(user, createInstrumentDto, file.filename);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', fileInterceptorOptions),
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update instrument with shortId' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Instrument,
  })
  update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateInstrumentDto: UpdateInstrumentDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.instrumentService.update(id, user, updateInstrumentDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete instrument with shortId' })
  remove(@Param('id') id: string) {
    return this.instrumentService.remove(id);
  }
}
