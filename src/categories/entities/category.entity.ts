import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty()
  @Column({ name: 'image' })
  image: string;

  @ApiProperty()
  @Column({ name: 'description' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
