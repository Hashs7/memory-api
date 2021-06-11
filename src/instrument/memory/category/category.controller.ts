import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AllowAny } from '../../../user/auth/JwtAuthGuard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @AllowAny()
  @ApiResponse({
    status: 200,
  })
  findAll() {
    return this.categoryService.findAll();
  }
}
