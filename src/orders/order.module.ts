import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { OrderItem } from './entities/order-item.entity';
import { ProductModule } from 'src/products/product.module';
import { ThirdPartyModule } from 'src/third-party/third-party.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule, ThirdPartyModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}