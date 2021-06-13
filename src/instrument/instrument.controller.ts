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
  Query,
  Logger,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/auth/get-user.decorator';
import { User } from '../user/user.schema';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { Instrument } from './instrument.schema';
import { AllowAny } from '../user/auth/JwtAuthGuard';

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

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [Instrument],
  })
  findForUser(@GetUser() user: User, @Query('username') username: string) {
    if (username) {
      return this.instrumentService.findForUsername(username);
    }
    return this.instrumentService.findForUser(user);
  }

  @Get(':id')
  @AllowAny()
  @ApiResponse({
    status: 200,
    type: Instrument,
  })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.instrumentService.findOnePopulate(id, user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
  ) {
    return this.instrumentService.create(user, createInstrumentDto);
  }

  @Patch('confirm-handover')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start handover instrument' })
  confirmHandover(@Query('token') token: string, @GetUser() user: User) {
    return this.instrumentService.confirmHandover(token, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', fileInterceptorOptions))
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
  ) {
    return this.instrumentService.update(id, user, updateInstrumentDto);
  }

  @Patch(':id/handover/:date')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start handover instrument' })
  initHandover(
    @Param('id') id: string,
    @Param('date') date: string,
    @GetUser() user: User,
  ) {
    return this.instrumentService.initHandover(id, new Date(date), user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete instrument with shortId' })
  @ApiBearerAuth()
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.instrumentService.remove(id, user);
  }
}
