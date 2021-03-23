import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { FilterUserDTO } from './dto/filter-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(
    @GetUser() user: User,
    @Query() filter: FilterUserDTO,
  ): Promise<User[]> {
    const users: User[] = await this.userService.getUsers(filter);
    return users
      .map(u => {
        delete u.password;
        delete u.salt;
        return u;
      })
      .filter(u => u.id !== user.id);
  }
}
