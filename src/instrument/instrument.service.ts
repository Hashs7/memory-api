import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Model} from 'mongoose';
import {Instrument} from './instrument.schema';
import {InjectModel} from '@nestjs/mongoose';
import {CreateInstrumentDto} from './dto/create-instrument.dto';
import {UpdateInstrumentDto} from './dto/update-instrument.dto';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as shortid from 'shortid';
import {User} from '../user/user.schema';
import {Memory} from './memory/memory.schema';
import {rewritePath} from '../file/file.helper';
import {FileService} from '../file/file.service';
import {File} from '../file/file.schema';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    private fileService: FileService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {
  }

  findAll() {
    return this.instrumentModel.find();
  }

  async findOne(id: string) {
    const instrument = await this.instrumentModel
      .findOne({id})
      .populate(['owner', 'image', {
        path: 'memories',
        populate: {
          path: 'contents', populate: {
            path: 'file', model: File.name
          }
        }
      }]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instrument.image.path = rewritePath(instrument.image);

    return instrument;
  }

  findForUser(user: User) {
    return this.instrumentModel.find({owner: user._id});
  }

  async create(
    user: User,
    createInstrumentDto: CreateInstrumentDto,
    file?: Express.Multer.File,
  ) {
    const id = shortid.generate();
    const instrument = await this.instrumentModel.create({
      ...createInstrumentDto,
      ...(file && {image: (await this.fileService.create(file))._id}),
      id,
      owner: user._id,
      memories: [],
    });

    const url = `${this.configService.get('APP_BASE_URL')}/instrument/${id}`;
    const img: string = await qrcode.toDataURL(url);
    const base64Data = img.split(';base64,').pop();

    fs.writeFile(
      '.tmp/qrcode.png',
      base64Data,
      {encoding: 'base64'},
      () => {
      },
    );

    return instrument;
  }

  async update(
    id: string,
    user: User,
    updateInstrumentDto: UpdateInstrumentDto,
    file?: Express.Multer.File,
  ) {
    const instrument = await this.findOne(id);
    if (!instrument) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }
    /*if (file) {
      updateInstrumentDto.image = file.filename;
    }*/
    return this.instrumentModel
      .findOneAndUpdate({id}, updateInstrumentDto, {new: true})
      .exec();
  }

  async addMemory(id: string, memory: Memory) {
    const instrument = await this.findOne(id);
    instrument.memories.push(memory);
    instrument.markModified('memories');

    return instrument.save();
  }

  async remove(id: string, user: User) {
    const instrument = await this.findOne(id);
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException(
        "L'utilisateur n'est pas propriétaire de l'instrument",
      );
    }

    return this.instrumentModel.findOneAndDelete({id});
  }
}
