import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addProduct({ name, description, image, categoryId }: Product) {
    const newProduct = this.productRepo.create({
      name,
      description,
      image,
      categoryId,
    });
    console.log(newProduct);
    return await this.productRepo.save(newProduct);
  }
  async getAllProduct(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async getProductById(productId: number): Promise<Product> {
    return await this.productRepo.findOne({
      id: productId,
    });
  }

  async updateProduct(product: Product) {
    return await this.productRepo.update(
      { id: product.id },
      {
        name: product.name,
        image: product.image,
        description: product.description,
      },
    );
  }

  async removeProduct(id: number) {
    this.productRepo.delete(id);
  }
}
