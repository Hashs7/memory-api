import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CommandModule } from 'nestjs-command';
import { CategorySeed } from './category.seed';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoryCategory, MemoryCategorySchema } from './category.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: MemoryCategory.name, schema: MemoryCategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategorySeed],
  exports: [CategoryService, CategorySeed],
})
export class CategoryModule {}
