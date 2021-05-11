import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/common/interfaces/order.interface';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId!: number;

  @ApiProperty()
  @Column({ name: 'total_price' })
  totalPrice: number;

  @ApiProperty()
  @Column({ name: 'paid_price' })
  paidPrice: number;

  @ApiProperty()
  @Column({ name: 'discount_price' })
  discountPrice: number;

  @ApiProperty()
  @Column({ name: 'address_street' })
  addressStreet: string;

  @ApiProperty()
  @Column({ name: 'address_province' })
  addressProvince: string;

  @ApiProperty()
  @Column({ name: 'address_district' })
  addressDistrict: string;

  @ApiProperty()
  @Column({ name: 'address_city' })
  addressCity: string;

  @ApiProperty()
  @Column({ name: 'address_zipcode' })
  addressZipcode: string;

  @ApiProperty()
  @Column({ name: 'phone' })
  phone: string;

  @ApiProperty()
  @Column({ name: 'slip' })
  slip?: string;

  @ApiProperty()
  @Column({ name: 'status', default: 'pending' })
  status: OrderStatusEnum;

  @Column({ name: 'created_at', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems?: OrderItem[];
}
