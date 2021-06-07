import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Query,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ObjectId } from 'mongoose';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
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
  */

  @Get()
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findUsers(@Query('username') username: string): Promise<User> {
    return this.userService.findUserByUsername(username);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: User,
  })
  async getLogUser(@GetUser() user: User) {
    const cleanUser = await this.userService.findUser(user._id);
    return { user: cleanUser };
  }

  @Get('/online')
  async getOnlineUsers(): Promise<User[]> {
    return this.userService.getOnlineUsers();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('thumbnail', fileInterceptorOptions))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updated user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.userService.update(user, updateUserDto, thumbnail);
  }

  @Patch('wishlist/:instrumentId')
  // @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updated user' })
  toggleToWishlist(
    @GetUser() user: User,
    @Param('instrumentId') instrumentId: string,
  ) {
    return this.userService.toggleToWishlist(user, instrumentId);
  }
}
