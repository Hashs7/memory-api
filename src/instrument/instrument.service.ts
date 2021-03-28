import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as shortid from 'shortid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Instrument) private instrumentRepository: Repository<Instrument>,
  ) {}

  async create(createInstrumentDto: CreateInstrumentDto) {
    const id = shortid.generate();
    const instrument = await this.instrumentRepository.create({
      ...createInstrumentDto,
      id,
    });
    const url: string = `${this.configService.get('APP_BASE_URL')}/instrument/${id}`;
    console.log(url);
    const img: string = await qrcode.toDataURL(url);
    const base64Data = img.split(';base64,').pop();

    fs.writeFile('.tmp/qrcode.png', base64Data, { encoding: 'base64' }, (e) => {
      console.log('qrcode img created');
    });

    return this.instrumentRepository.save(instrument);
  }

  findAll() {
    return this.instrumentRepository.find();
  }

  findOne(id: string) {
    return this.instrumentRepository.findOne({ id });
  }

  update(id: string, updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentRepository.update(id, {
      ...updateInstrumentDto,
    });
  }

  remove(id: string) {
    return this.instrumentRepository.delete(id);
  }
}
