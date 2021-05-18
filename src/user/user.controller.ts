import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from './auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.schema';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findUsers(
    @GetUser() user: User,
    @Body('users') userIds: string[],
  ): Promise<User[]> {
    const users = await this.userService.findUsers(userIds);
    return users
      .map((u) => {
        delete u.password;
        delete u.salt;
        return u;
      })
      .filter((u) => u.id !== user.id);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: User,
  })
  getLogUser(@GetUser() user: User) {
    user.salt = null;
    user.password = null;
    return { user };
  }

  @Get('/online')
  async getOnlineUsers(): Promise<User[]> {
    return this.userService.getOnlineUsers();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updated user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }
}
