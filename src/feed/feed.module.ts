import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';

import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from '../instrument/instrument.schema';
import { Memory, MemorySchema } from '../instrument/memory/memory.schema';
import {
  MemoryCategory,
  MemoryCategorySchema,
} from '../instrument/memory/category/category.schema';
import {
  MemoryContent,
  MemoryContentSchema,
} from '../instrument/memory/content/content.schema';
import { InstrumentService } from '../instrument/instrument.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CategoryService } from '../instrument/memory/category/category.service';
import { MemoryService } from '../instrument/memory/memory.service';

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
  controllers: [FeedController],
  providers: [FeedService, InstrumentService, MemoryService, CategoryService],
  exports: [FeedService],
})
export class FeedModule {}
