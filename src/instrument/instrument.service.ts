import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Instrument, OldOwnerInterface } from './instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as shortid from 'shortid';
import { User } from '../user/user.schema';
import { Memory } from './memory/memory.schema';
import { FileService } from '../file/file.service';
import { File } from '../file/file.schema';
import { ContentType } from './memory/content/content.schema';
import { randomBytes } from 'crypto';
import { UserService } from '../user/user.service';
import { OldOwner } from './oldowner/oldowner.schema';
import { async } from 'rxjs';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    private fileService: FileService,
    private userService: UserService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  search(q: string) {
    return this.instrumentModel
      .find({
        $or: [
          {
            brand: {
              $regex: new RegExp(q),
            },
          },
          {
            modelName: {
              $regex: new RegExp(q),
            },
          },
          {
            type: {
              $regex: new RegExp(q),
            },
          },
        ],
      })
      .limit(10);
  }

  private validateInstrumentOwner(instrument, user) {
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException("Utilisateur n'est pas propriétaire");
    }
  }

  /**
   * Find all instruments
   */
  findAll() {
    return this.instrumentModel
      .find()
      .select('-_id -memories -__v')
      .populate([
        'owner',
        'images',
        {
          path: 'owner',
          select: 'username -_id',
          populate: {
            path: 'thumbnail',
          },
        },
      ]);
  }

  async findOne(id: string) {
    return this.instrumentModel.findOne({ id });
  }

  /**
   * Find one instrument with id
   * @param id
   * @param user
   */
  async findOnePopulate(id: string, user?: User) {
    const instrument = await this.instrumentModel
      .findOne({ id })
      .select('-__v')
      .populate([
        'owner',
        'images',
        {
          path: 'memories',
          select: 'username',
          populate: {
            path: 'contents',
            populate: {
              path: 'file',
              model: File.name,
            },
          },
        },
        {
          path: 'owner',
          select: 'username firstName lastName _id',
          populate: {
            path: 'thumbnail',
          },
        },
      ]);

    if (!user || !instrument.owner.equals(user._id)) {
      instrument.memories = instrument.memories.filter((m) => {
        if (m.visibility == 'Public') {
          return m;
        }
      });
    }

    instrument.owner.thumbnail?.rewritePath();
    instrument.images?.map((i) => i.rewritePath());
    instrument.memories = instrument.memories.map((m) => {
      m.contents = m.contents.map((c) => {
        if (c.type !== ContentType.Text) {
          c.file?.rewritePath();
        }
        return c;
      });
      return m;
    });

    const oldOwnersUser = await Promise.all(
      instrument.oldOwnersUser.map(async (o) => ({
        _id: o._id,
        from: o.from,
        to: o.to,
        user: await this.userService.findUser(o.user._id),
      })),
    );

    instrument.oldOwnersUser = this.sortOldowners(
      oldOwnersUser,
      instrument.oldOwners,
    );
    instrument.oldOwners = undefined;

    return instrument;
  }

  sortOldowners(oldOwnersUser, oldOwners: OldOwnerInterface[]) {
    const oldOwnersConcat = oldOwnersUser.concat(oldOwners);

    // @ts-ignore
    oldOwnersConcat.sort((a, b) => new Date(b.to) - new Date(a.to));

    return oldOwnersConcat;
  }

  filterMemories(instrument: Instrument, user: User) {
    if (!user || !instrument.owner.equals(user._id)) {
      instrument.memories = instrument.memories.filter((m) => {
        if (m.visibility == 'Public') {
          return m;
        }
      });
    }
  }

  rewriteMemories(instrument: Instrument) {
    instrument.memories = instrument.memories.map((m) => {
      m.contents = m.contents.map((c) => {
        if (c.type !== ContentType.Text) {
          c.file?.rewritePath();
        }
        return c;
      });
      return m;
    });
  }

  /**
   * Find user instruments
   * @param user
   */
  async findForUser(user: User) {
    const userInstruments = await this.instrumentModel
      .find({
        owner: user._id,
      })
      .populate([
        'images',
        {
          path: 'memories',
          // select: 'username',
          populate: {
            path: 'contents',
            populate: {
              path: 'file',
              model: File.name,
            },
          },
        },
      ]);

    userInstruments.forEach((ins) => this.filterMemories(ins, user));
    userInstruments.forEach((ins) => this.rewriteMemories(ins));

    const oldInstruments = await this.instrumentModel
      .find({
        oldOwnersUser: { $in: user._id },
      })
      .populate('images');
    const wishInstruments = await this.instrumentModel
      .find({
        _id: { $in: user.wishList },
      })
      .populate('images');

    [userInstruments, oldInstruments, wishInstruments].forEach((arr) => {
      arr.forEach((instrument) => {
        instrument.images?.map((i) => i?.rewritePath());
      });
    });

    return {
      userInstruments,
      oldInstruments,
      wishInstruments,
    };
  }

  /**
   * Find user instruments
   * @param username
   */
  async findForUsername(username: string) {
    const user = await this.userService.findUserByUsername(username);
    return this.findForUser(user);
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
    const instrumentUsers = await Promise.all([
      ...createInstrumentDto.oldOwnersUser.map((o) => {
        if (typeof o.user === 'string') {
          return this.userService.findUser(o.user);
        }
        return o.user;
      }),
    ]);

    const oldOwnersUser: OldOwner[] = createInstrumentDto.oldOwnersUser.reduce(
      (acc, cur) => {
        const user = instrumentUsers.find((user) => user._id.equals(cur.user));
        // @ts-ignore
        cur.user = {
          _id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          thumbnail: user.thumbnail,
        };
        return [...acc, { ...cur }];
      },
      [],
    );
    delete createInstrumentDto.oldOwnersUser;

    const id = shortid.generate();
    const instrument = await this.instrumentModel.create({
      ...createInstrumentDto,
      ...(file && {
        image: (await this.fileService.create(file, user._id))._id,
      }),
      id,
      lastHandoverDate: createInstrumentDto.buyDate,
      oldOwnersUser,
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
   */
  async update(
    id: string,
    user: User,
    updateInstrumentDto: UpdateInstrumentDto,
  ) {
    const instrument = await this.instrumentModel.findOne({ id });
    if (!instrument) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    this.validateInstrumentOwner(instrument, user);

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
    const instrument = await this.instrumentModel.findOne({ id });
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

    if (instrument.owner.equals(user._id)) {
      throw new UnauthorizedException('Passation à vous même');
    }

    instrument.handoverToken = null;
    instrument.handoverExpire = null;

    // @ts-ignore
    const oldOwner: OldOwner = {
      user: instrument.owner,
      from: instrument.lastHandoverDate,
      to: new Date(),
    };

    instrument.oldOwnersUser.push(oldOwner);

    instrument.lastHandoverDate = new Date();
    instrument.owner = user._id;

    await instrument.save();

    return this.findOnePopulate(instrument.id, user);
  }

  /**
   * Add new memory
   * @param id
   * @param memory
   */
  async addMemory(id: string, memory: Memory) {
    const instrument = await this.instrumentModel.findOne({ id });
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
    const instrument = await this.instrumentModel.findOne({ id });
    // @ts-ignore
    if (!instrument.owner.equals(user._id)) {
      throw new UnauthorizedException(
        "L'utilisateur n'est pas propriétaire de l'instrument",
      );
    }
    return this.instrumentModel.findOneAndDelete({ id });
  }
}
