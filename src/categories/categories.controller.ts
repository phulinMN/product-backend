import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
@ApiTags('Categories')
@Controller('Categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @ApiOkResponse()
  @Get()
  getAll() {
    return this.categoryService.getCategories();
  }

  @ApiOkResponse()
  @Get(':id')
  get(@Param('id') id: number) {
    return this.categoryService.getCategory(id);
  }

  @ApiOkResponse()
  @Post()
  create(@Body() category: Category) {
    return this.categoryService.createCategory(category);
  }

  @ApiOkResponse()
  @Put(':id')
  update(@Param('id') id: number, @Body() category: Category) {
    return this.categoryService.updateCategory({ id, ...category });
  }

  @ApiOkResponse()
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.categoryService.removeCategory(id);
  }
}
