import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { FilterUserDTO } from './dto/filter-user.dto';

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

  async findByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        $or: [
          { username },
          { email: username },
        ]
      }
    })
  }

  async getUsers(filter: FilterUserDTO): Promise<User[]> {
    return this.userRepository.getUsers(filter);
  }
}
