import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { OrderStatusEnum } from 'src/common/interfaces/order.interface';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

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
  addressStreet: number;


  @ApiProperty()
  @Column({ name: 'address_province' })
  addressProvince: number;


  @ApiProperty()
  @Column({ name: 'address_district' })
  addressDistrict: number;

  @ApiProperty()
  @Column({ name: 'address_city' })
  addressCity: number;

  @ApiProperty()
  @Column({ name: 'address_zipcode' })
  addressZipcode: number;

  @ApiProperty()
  @Column({ name: 'phone' })
  phone: number;

  @ApiProperty()
  @Column({ name: 'slip' })
  slip: number;

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
}
