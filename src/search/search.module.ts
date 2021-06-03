import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { InstrumentService } from '../instrument/instrument.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from '../instrument/instrument.schema';
import { UserModule } from '../user/user.module';
import { Memory, MemorySchema } from '../instrument/memory/memory.schema';
import { MemoryService } from '../instrument/memory/memory.service';
import {
  MemoryCategory,
  MemoryCategorySchema,
} from '../instrument/memory/category/category.schema';
import { CategoryService } from '../instrument/memory/category/category.service';
import {
  MemoryContent,
  MemoryContentSchema,
} from '../instrument/memory/content/content.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema },
      { name: Memory.name, schema: MemorySchema },
      { name: MemoryCategory.name, schema: MemoryCategorySchema },
      { name: MemoryContent.name, schema: MemoryContentSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, InstrumentService, MemoryService, CategoryService],
  exports: [SearchService],
})
export class SearchModule {}
