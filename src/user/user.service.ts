import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import * as shortid from 'shortid';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserbyEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findUser(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }) ;
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
    const { email, username } = createUserDTO;

    const user = new this.userModel();
    user.id = shortid.generate();
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = hashPassword;

    return user.save();
  }

  async findByUsernameOrEmail(username: string): Promise<User> {
    return this.userModel.findOne({
      $or: [{ username }, { email: username }],
    });
  }

  /*  async getUsers(filter: FilterUserDTO): Promise<User[]> {
    return this.userModel.getUsers(filter);
  }*/

  async getOnlineUsers(): Promise<User[]> {
    // TODO filter by online props
    return this.userModel.find();
  }
}
