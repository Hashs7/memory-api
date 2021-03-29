import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { FilterUserDTO } from './dto/filter-user.dto';
import * as shortid from 'shortid';
import { CreateUserDTO } from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async findUserbyEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async saveUser(user: User) {
    const usersaved: User = await this.userRepository.save(user);
    // this.chatGateway.wss.emit('users/new', usersaved);
    return usersaved;
  }

  async createUser(
    createUserDTO: CreateUserDTO,
    salt: string,
    hashPassword: string,
  ) {
    const { email, username } = createUserDTO;

    const user = new User();
    user.id = shortid.generate();
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = hashPassword;

    return this.userRepository.save(user);
  }

  async findByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        $or: [{ username }, { email: username }],
      },
    });
  }

  async getUsers(filter: FilterUserDTO): Promise<User[]> {
    return this.userRepository.getUsers(filter);
  }

  async getOnlineUsers(): Promise<User[]> {
    // TODO filter by online props
    return this.userRepository.find();
  }
}
