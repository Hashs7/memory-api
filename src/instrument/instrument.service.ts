import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Instrument, OldOwnerInterface } from './instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import * as shortid from 'shortid';
import { User } from '../user/user.schema';
import { Memory } from './memory/memory.schema';
import { FileService } from '../file/file.service';
import { File } from '../file/file.schema';
import { ContentType } from './memory/content/content.schema';
import { randomBytes } from 'crypto';
import { UserService } from '../user/user.service';
import { OldOwner } from './oldowner/oldowner.schema';

@Injectable()
export class InstrumentService {
  constructor(
    private configService: ConfigService,
    private fileService: FileService,
    private userService: UserService,
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  /**
   * Search query instruments
   * @param q
   * @param forSale
   * @param instruTypes
   */
  search(q: string, forSale: string, instruTypes: string) {
    const filters: any = {};

    if (forSale) {
      filters.forSale = forSale;
    }

    if (instruTypes) {
      filters.type = { $in: instruTypes };
    }

    return this.instrumentModel
      .find({
        $or: [
          {
            brand: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },
          {
            modelName: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },
          {
            type: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },

          {
            colors: {
              $regex: new RegExp('^' + q.toLowerCase(), 'i'),
            },
          },
        ],
      })
      .select('images brand modelName name forSale type owner memories')
      .limit(10)
      .find(filters)
      .populate([
        'owner',
        'images',
        {
          path: 'owner',
          select: 'username firstName lastName _id',
          populate: {
            path: 'thumbnail',
          },
        },
      ]);
  }

  /**
   * Filter only visible memories
   * @param instrumentRes
   */
  searchSerialize(instrumentRes: Instrument[]): Instrument[] {
    instrumentRes.map((i) => {
      i.memories = i.memories.filter((m) => {
        if (m.visibility == 'public') return m;
      });
      return i;
    });
    return instrumentRes;
  }

  /**
   * Guard modify to only owner
   * @param instrument
   * @param user
   * @private
   */
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

  /**
   * Find one instrument with id
   * @param id
   */
  async findOne(id: string) {
    return this.instrumentModel.findOne({ id });
  }

  async findFeed(ids: string[]) {
    let instrumentRes = await this.instrumentModel
      .find({
        id: {
          $in: ids,
        },
      })
      .populate([
        'owner',
        'images',
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

    instrumentRes.map((i) => {
      i.images?.map((im) => im.rewritePath());
    });

    instrumentRes = this.searchSerialize(instrumentRes);

    return instrumentRes;
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

    instrument.memories = instrument.memories.filter((m) => {
      if (m.visibility == 'public') return m;
      else {
        if (user._id) {
          if (user._id.equals(m.createdBy)) return m;
        }
      }
    });

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
    instrument.oldOwners = null;

    return instrument;
  }

  /**
   * Sort old owners by most recent
   * @param oldOwnersUser
   * @param oldOwners
   */
  sortOldowners(oldOwnersUser, oldOwners: OldOwnerInterface[]): OldOwner[] {
    const oldOwnersConcat = oldOwnersUser.concat(oldOwners);

    // @ts-ignore
    oldOwnersConcat.sort((a, b) => new Date(b.to) - new Date(a.to));

    return oldOwnersConcat;
  }

  /**
   * Filter memories by visibility
   * @param instrument
   * @param user
   */
  filterMemories(instrument: Instrument, user: User) {
    if (!user || !instrument.owner.equals(user._id)) {
      instrument.memories = instrument.memories.filter((m) => {
        if (m.visibility == 'Public') {
          return m;
        }
      });
    }
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

    const oldInstruments = await this.instrumentModel
      .find({
        'oldOwnersUser.user': { $in: user._id },
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
   */
  async create(user: User, createInstrumentDto: CreateInstrumentDto) {
    let oldOwnersUser: OldOwner[] = [];

    if (createInstrumentDto.oldOwnersUser) {
      const instrumentUsers = await Promise.all([
        ...createInstrumentDto.oldOwnersUser.map((o) => {
          if (typeof o.user === 'string') {
            return this.userService.findUser(o.user);
          }
          return o.user;
        }),
      ]);
      oldOwnersUser = createInstrumentDto.oldOwnersUser?.reduce((acc, cur) => {
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
      }, []);
      delete createInstrumentDto.oldOwnersUser;
    }

    const id = shortid.generate();
    return this.instrumentModel.create({
      ...createInstrumentDto,
      id,
      lastHandoverDate: createInstrumentDto.buyDate,
      oldOwnersUser,
      owner: user._id,
      memories: [],
    });
  }

  /**
   * Find instrument by memory
   * @param memoryId
   */
  async findByMemory(memoryId: string): Promise<Instrument> {
    return this.instrumentModel.findOne({ 'memories.id': memoryId }).populate([
      { path: 'images', select: 'path' },
      { path: 'owner', select: 'username' },
    ]);
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
  ): Promise<Instrument> {
    const instrument = await this.instrumentModel.findOne({ id });
    if (!instrument) {
      throw new NotFoundException("L'instrument n'existe pas");
    }
    this.validateInstrumentOwner(instrument, user);

    await this.instrumentModel.findOneAndUpdate({ id }, updateInstrumentDto, {
      new: true,
    });
    return this.findOnePopulate(id, user);
  }

  /**
   * Generate instrument handover token
   * set handover date
   * Expire in 7 days
   * @param id
   * @param date
   * @param user
   */
  async initHandover(
    id: string,
    date: Date,
    user: User,
  ): Promise<{ token: string }> {
    const instrument = await this.instrumentModel.findOne({ id });
    this.validateInstrumentOwner(instrument, user);

    if (!instrument.handoverToken) {
      instrument.handoverToken = randomBytes(8).toString('hex');
    }

    const expire = new Date();
    // Expire in 7 days
    expire.setDate(expire.getDate() + 7);
    instrument.handoverExpire = expire;
    instrument.nextHandoverDate = date;

    await instrument.save();

    return {
      token: instrument.handoverToken,
    };
  }

  /**
   * Confirm handover token
   * associate instrument to new owner
   * set old owner
   * @param token
   * @param user
   */
  async confirmHandover(token: string, user: User): Promise<Instrument> {
    const instrument = await this.instrumentModel.findOne({
      handoverToken: token,
    });

    if (instrument.owner.equals(user._id)) {
      throw new UnauthorizedException('Passation à vous même');
    }

    // @ts-ignore
    const oldOwner: OldOwner = {
      user: instrument.owner,
      from: instrument.lastHandoverDate,
      to: instrument.nextHandoverDate,
    };

    instrument.owner = user._id;
    instrument.oldOwnersUser.push(oldOwner);
    instrument.lastHandoverDate = new Date();
    instrument.handoverToken = null;
    instrument.handoverExpire = null;
    instrument.nextHandoverDate = null;

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
