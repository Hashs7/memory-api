import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Types, Schema } from 'mongoose';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  public async search(
    @Query('text') searchText: string,
    @Query('categories') cat: string,
  ): Promise<any> {
    let categories = null;
    if (cat) {
      categories = cat.split(',').map((c) => Types.ObjectId(c));
    }
    return await this.searchService.search(searchText, categories);
  }
}
