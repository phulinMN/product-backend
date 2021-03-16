import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(category: Category) {
    this.categoriesRepository.create(category);
  }
  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async getCategory(categoryId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({
      id: categoryId,
    });
  }

  async updateCategory(user: Category) {
    this.categoriesRepository.save(user);
  }

  async removeCategory(user: Category) {
    this.categoriesRepository.delete(user);
  }
}
