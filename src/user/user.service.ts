import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import * as shortid from 'shortid';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserbyEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findUser(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findUserWithResetToken(resetPasswordToken: string): Promise<User> {
    return this.userModel.findOne({ resetPasswordToken });
  }

  findUsers(ids: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: ids } }).exec();
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
  ) {
    const { email, username, firstName, lastName, phoneNumber } = createUserDTO;

    const user = new this.userModel();
    user.id = shortid.generate();
    user.email = email;
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.salt = salt;
    user.password = hashPassword;

    return user.save();
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

  async update(user: User, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findOneAndUpdate({ _id: user._id }, updateUserDto, { new: true })
      .exec();
  }
}
