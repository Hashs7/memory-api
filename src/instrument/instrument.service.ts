import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Instrument } from './instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as shortid from 'shortid';
import { User } from '../user/user.schema';
import { Memory } from './memory/memory.schema';
import { rewritePath } from '../file/file.helper';
import { FileService } from '../file/file.service';
import { File } from '../file/file.schema';
import { ContentType } from './memory/content/content.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    private fileService: FileService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  private validateInstrumentOwner(instrument, user) {
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }
  }

  /**
   * Find all instruments
   */
  findAll() {
    return this.instrumentModel.find();
  }

  /**
   * Find one instrument with id
   * @param id
   */
  async findOne(id: string) {
    const instrument = await this.instrumentModel.findOne({ id }).populate([
      'owner',
      'image',
      {
        path: 'memories',
        populate: {
          path: 'contents',
          populate: {
            path: 'file',
            model: File.name,
          },
        },
      },
    ]);

    // @ts-ignore
    instrument.image?.path = rewritePath(instrument.image);
    instrument.memories = instrument.memories.map((m) => {
      m.contents = m.contents.map((c) => {
        if (c.type !== ContentType.Text) {
          // @ts-ignore
          c.file?.path = rewritePath(c.file);
        }
        return c;
      });
      return m;
    });

    return instrument;
  }

  /**
   * Find user instruments
   * @param user
   */
  findForUser(user: User) {
    return this.instrumentModel.find({ owner: user._id });
  }

  /**
   * Create new instrument
   * @param user
   * @param createInstrumentDto
   * @param file
   */
  async create(
    user: User,
    createInstrumentDto: CreateInstrumentDto,
    file?: Express.Multer.File,
  ) {
    const id = shortid.generate();
    const instrument = await this.instrumentModel.create({
      ...createInstrumentDto,
      ...(file && { image: (await this.fileService.create(file))._id }),
      id,
      owner: user._id,
      memories: [],
    });

    const url = `${this.configService.get('APP_BASE_URL')}/instrument/${id}`;
    const img: string = await qrcode.toDataURL(url);
    const base64Data = img.split(';base64,').pop();

    fs.writeFile('.tmp/qrcode.png', base64Data, { encoding: 'base64' }, () =>
      console.log('created'),
    );

    return instrument;
  }

  /**
   * Update instrument props
   * @param id
   * @param user
   * @param updateInstrumentDto
   * @param file
   */
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
    this.validateInstrumentOwner(instrument, user);
    /*if (file) {
      updateInstrumentDto.image = file.filename;
    }*/
    return this.instrumentModel
      .findOneAndUpdate({ id }, updateInstrumentDto, { new: true })
      .exec();
  }

  /**
   * Init instrument handover
   * @param id
   * @param user
   */
  async initHandover(id: string, user: User): Promise<{ token: string }> {
    const instrument = await this.findOne(id);
    this.validateInstrumentOwner(instrument, user);

    if (!instrument.handoverToken) {
      instrument.handoverToken = randomBytes(20).toString('hex');
    }

    const expire = new Date();
    // Expire in 7 days
    expire.setDate(expire.getDate() + 7);
    instrument.handoverExpire = expire;

    await instrument.save();

    return {
      token: instrument.handoverToken,
    };
  }

  async confirmHandover(token: string, user: User): Promise<Instrument> {
    const instrument = await this.instrumentModel.findOne({
      handoverToken: token,
    });

    if (!instrument || instrument.handoverExpire < new Date()) {
      throw new UnauthorizedException('La passation a expiré');
    }

    instrument.handoverToken = null;
    instrument.handoverExpire = null;
    instrument.oldOwners.push(instrument.owner);
    instrument.owner = user._id;
    await instrument.save();

    return instrument;
  }

  /**
   * Add new memory
   * @param id
   * @param memory
   */
  async addMemory(id: string, memory: Memory) {
    const instrument = await this.findOne(id);
    instrument.memories.push(memory);
    instrument.markModified('memories');

    return instrument.save();
  }

  /**
   * Delete instrument
   * @param id
   * @param user
   */
  async remove(id: string, user: User) {
    const instrument = await this.findOne(id);
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException(
        "L'utilisateur n'est pas propriétaire de l'instrument",
      );
    }

    return this.instrumentModel.findOneAndDelete({ id });
  }
}
