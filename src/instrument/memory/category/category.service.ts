import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

import { Model } from 'mongoose';
import { MemoryCategory } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { User } from '../../../user/user.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(MemoryCategory.name)
    private memoryCategoryModel: Model<MemoryCategory>,
  ) {}

  async createMultiple(
    createCategoryDto: CreateCategoryDto[],
  ): Promise<MemoryCategory[]> {
    const categories = createCategoryDto.map((c) => {
      return { name: c.name, slug: slugify(c.name) };
    });
    return await this.memoryCategoryModel.create(categories);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<MemoryCategory> {
    return await this.memoryCategoryModel.create({
      ...createCategoryDto,
      slug: slugify(createCategoryDto.name),
    });
  }

  /**
   * Find all instruments
   */
  findAll() {
    return this.memoryCategoryModel.find();
  }

  findCategories(ids: string[]): Promise<MemoryCategory[]> {
    return this.memoryCategoryModel.find({ _id: { $in: ids } }).exec();
  }
}
