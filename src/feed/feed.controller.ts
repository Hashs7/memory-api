import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { FeedService } from './feed.service';
import { GetUser } from '../user/auth/helpers/get-user.decorator';
import { User } from '../user/user.schema';
import { Types } from 'mongoose';
import { AllowAny } from '../user/auth/helpers/JwtAuthGuard';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  public async getFeedFavMemories(@GetUser() user: User) {
    return await this.feedService.getFeedFavMemories(user);
  }

  @AllowAny()
  @Get('categories')
  public async getMemoriesCat(
    @GetUser() user: User,
    @Query('categories') cat: string,
  ) {
    let categories = null;
    if (cat) {
      categories = cat.split(',').map((c) => Types.ObjectId(c));
    }
    return await this.feedService.getMemoriesCat(user, categories);
  }
}
