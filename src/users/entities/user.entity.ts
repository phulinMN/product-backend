import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'username' })
  username!: string;

  @Column({ name: 'email' })
  email!: string;

  @ApiProperty()
  @Column({ name: 'firstname' })
  firstname!: string;

  @ApiProperty()
  @Column({ name: 'lastname' })
  lastname!: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'created_at', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
