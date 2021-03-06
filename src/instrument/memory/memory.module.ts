import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentService } from '../instrument.service';
import { Instrument, InstrumentSchema } from '../instrument.schema';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import { User, UserSchema } from '../../user/user.schema';
import { Memory, MemorySchema } from './memory.schema';
import { MemoryContent, MemoryContentSchema } from './content/content.schema';
import { FileService } from '../../file/file.service';
import { File, FileSchema } from '../../file/file.schema';
import {
  MemoryCategory,
  MemoryCategorySchema,
} from './category/category.schema';
import { CategoryService } from './category/category.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Memory.name, schema: MemorySchema },
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
      { name: Instrument.name, schema: InstrumentSchema },
      { name: MemoryContent.name, schema: MemoryContentSchema },
      { name: MemoryCategory.name, schema: MemoryCategorySchema },
    ]),
  ],
  controllers: [MemoryController],
  providers: [
    MemoryService,
    InstrumentService,
    UserService,
    CategoryService,
    FileService,
  ],
  exports: [MemoryService],
})
export class MemoryModule {}
