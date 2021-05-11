import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { OrderItem } from './entities/order-item.entity';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}