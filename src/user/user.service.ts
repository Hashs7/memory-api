import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './update-user.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  userSelectFields: string;

  constructor(
    private readonly fileService: FileService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.userSelectFields =
      '-password -salt -resetPasswordToken -resetPasswordExpire';
  }

  search(q: string) {
    return this.userModel
      .find({
        username: {
          $regex: new RegExp('^' + q.toLowerCase(), 'i'),
        },
      })
      .limit(10)
      .select('username')
      .populate('thumbnail');
  }

  async findUserbyEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async usernameExist(name: string): Promise<boolean> {
    const username = name.toLowerCase();
    return !!(await this.userModel.findOne({ username }));
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel
      .findOne({ username })
      .select(this.userSelectFields)
      .populate('thumbnail');
    if (!user) {
      throw new NotFoundException('Aucun utilisateur trouvé');
    }
    delete user.password;
    delete user.salt;
    user.thumbnail?.rewritePath();
    return user;
  }

  async findUser(id: string): Promise<User> {
    return this.userModel
      .findOne({ _id: id })
      .select(this.userSelectFields)
      .populate('thumbnail');
  }

  async findUserWithResetToken(resetPasswordToken: string): Promise<User> {
    return this.userModel.findOne({ resetPasswordToken });
  }

  async findUsers(ids: string[]): Promise<User[]> {
    return this.userModel
      .find({ _id: { $in: ids } })
      .select(this.userSelectFields)
      .populate('thumbnail');
  }

  async saveUser(user: User): Promise<User> {
    const usersaved: User = await this.userModel.create(user);
    // this.chatGateway.wss.emit('users/new', usersaved);
    return usersaved;
  }

  async createUser(
    createUserDTO: CreateUserDto,
    salt: string,
    hashPassword: string,
  ): Promise<User> {
    return this.userModel.create({
      ...createUserDTO,
      username: createUserDTO.username.toLowerCase(),
      password: hashPassword,
      salt,
    });
  }

  handleNewConnection(user: User) {
    user.isOnline = true;
    user.lastConnection = new Date();

    user.save();
  }

  async getUsers(ids: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: ids } }).exec();
  }

  async getOnlineUsers(): Promise<User[]> {
    return this.userModel.find({ isOnline: true });
  }

  async findByUsernameOrEmail(username: string): Promise<User> {
    return this.userModel.findOne({
      $or: [{ username }, { email: username }],
    });
  }

  async update(
    user: User,
    updateUserDto: UpdateUserDto,
    thumbnailFile?: Express.Multer.File,
  ): Promise<User> {
    let thumbnail;
    if (thumbnailFile) {
      thumbnail = await this.fileService.create(thumbnailFile, user._id);
    }

    if (
      updateUserDto.username &&
      updateUserDto.username !== user.username &&
      (await this.usernameExist(updateUserDto.username))
    ) {
      throw new BadRequestException("Le nom d'utilisateur est déjà utilisé");
    }

    return this.userModel
      .findOneAndUpdate(
        { _id: user._id },
        {
          ...updateUserDto,
          ...(thumbnailFile && { thumbnail: thumbnail._id }),
        },
        {
          useFindAndModify: false,
        },
      )
      .select(this.userSelectFields);
  }

  async toggleToWishlist(user: User, instrumentId: string): Promise<User> {
    const index = user.wishList.indexOf(instrumentId);
    if (index === -1) {
      user.wishList.push(instrumentId);
    } else {
      user.wishList.splice(index, 1);
    }
    return user.save();
  }
}
