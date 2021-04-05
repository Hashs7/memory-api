import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Instrument } from './instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as shortid from 'shortid';
import { User } from "../user/user.schema";
import { Memory } from './memory/memory.schema';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  findAll() {
    return this.instrumentModel.find();
  }

  findOne(id: string) {
    return this.instrumentModel.findOne({ id });
  }

  findForUser(user: User) {
    return this.instrumentModel.find({ owner: user._id });
  }

  async create(user: User, createInstrumentDto: CreateInstrumentDto, filename: string) {
    const id = shortid.generate();
    const instrument = await this.instrumentModel.create({
      ...createInstrumentDto,
      id,
      image: filename,
      owner: user._id,
      memories: [],
    });

    const url = `${this.configService.get('APP_BASE_URL')}/instrument/${id}`;
    const img: string = await qrcode.toDataURL(url);
    const base64Data = img.split(';base64,').pop();

    fs.writeFile(
      '.tmp/qrcode.png',
      base64Data,
      { encoding: 'base64' },
      () => {},
    );

    return instrument;
  }

  async update(
    id: string,
    user: User,
    updateInstrumentDto: UpdateInstrumentDto,
    file?: Express.Multer.File
  ) {
    const instrument = await this.findOne(id);
    if (!instrument) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }
    if (file) {
      updateInstrumentDto.image = file.filename;
    }
    return this.instrumentModel
      .findOneAndUpdate({ id }, updateInstrumentDto, { new: true })
      .exec();
  }

  async addMemory(
    id: string,
    memory: Memory
  ) {
    const instrument = await this.findOne(id);
    instrument.memories.push(memory);
    instrument.markModified('memories');

    return instrument.save();
  }

  remove(id: string) {
    return this.instrumentModel.findOneAndDelete({ id });
  }
}
