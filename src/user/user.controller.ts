import {Body, Controller, Get, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { FilterUserDTO } from './dto/filter-user.dto';
import {User} from "./user.schema";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * TODO Fix
   * @param user
   * @param userIds
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(
    @GetUser() user: User,
    @Body('users') userIds: string[],
    // @Query() filter: FilterUserDTO,
  ): Promise<User[]> {
    const users: User[] = await this.userService.getUsers(userIds);
    console.log(users);
    // const users: User[] = await this.userService.getUsers(filter);
    return users;
    /*
  return users
      .map(u => {
        delete u.password;
        delete u.salt;
        return u;
      })
      .filter(u => u.id !== user.id);*/
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getLogUser(@GetUser() user: User): User {
    delete user.salt;
    delete user.password;
    return user;
  }

  @Get('/online')
  async getOnlineUsers(): Promise<User[]> {
    return this.userService.getOnlineUsers();
  }
}
