import { Injectable } from '@nestjs/common';
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

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  async create(user: User, createInstrumentDto: CreateInstrumentDto) {
    const id = shortid.generate();
    const instrument = await this.instrumentModel.create({
      ...createInstrumentDto,
      id,
      owner: user._id,
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

  findForUser(user: User) {
    return this.instrumentModel.find({ owner: user._id });
  }

  findAll() {
    return this.instrumentModel.find();
  }

  findOne(id: string) {
    return this.instrumentModel.findOne({ id });
  }

  update(id: string, updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentModel
      .findByIdAndUpdate(id, updateInstrumentDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.instrumentModel.deleteOne({ _id: id });
  }
}
