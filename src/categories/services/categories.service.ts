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
    const newCategory = this.categoriesRepository.create(category);
    return await this.categoriesRepository.save(newCategory);
  }
  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async getCategory(categoryId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({
      id: categoryId,
    });
  }

  async updateCategory(category: Category) {
    return await this.categoriesRepository.update(
      { id: category.id },
      {
        name: category.name,
        image: category.image,
        description: category.description,
      },
    );
  }

  async removeCategory(id: number) {
    this.categoriesRepository.delete(id);
  }
}
