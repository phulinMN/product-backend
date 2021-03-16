import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'description' })
  description: string;
}
