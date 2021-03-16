import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  get(@Param() params) {
    return this.categoryService.getCategory(params.id);
  }

  @Post()
  create(@Body() category: Category) {
    return this.categoryService.createCategory(category);
  }

  @Put()
  update(@Body() category: Category) {
    return this.categoryService.updateCategory(category);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.categoryService.removeCategory(params.id);
  }
}
