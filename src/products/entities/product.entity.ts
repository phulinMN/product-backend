import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId!: number;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty()
  @Column({ name: 'image' })
  image: string;

  @ApiProperty()
  @Column({ name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ name: 'price', default: 0 })
  price: number;

  @Column({ name: 'created_at', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category?: Category;
}
