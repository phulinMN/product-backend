import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateOrder,
  ICreateOrderItem,
  OrderStatusEnum,
} from 'src/common/interfaces/order.interface';
import { ProductService } from 'src/products/services/product.service';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    private productService: ProductService,
  ) {}

  async createOrderItem(orderId: number, data: ICreateOrderItem) {
    const { quantity, productId } = data;
    const newOrderItem = this.orderItemRepo.create({
      orderId,
      quantity,
      productId,
    });
    return await this.orderItemRepo.save(newOrderItem);
  }

  async createOrder(userId: number, data: ICreateOrder) {
    const {
      status,
      products,
      phone,
      addressStreet,
      addressCity,
      addressDistrict,
      addressProvince,
      addressZipcode,
    } = data;
    const newOrder = this.orderRepo.create({
      userId,
      totalPrice: 0,
      paidPrice: 0,
      discountPrice: 0,
      status: status || OrderStatusEnum.PENDING,
      phone,
      addressStreet,
      addressCity,
      addressDistrict,
      addressProvince,
      addressZipcode,
    });
    console.log('newOrder', newOrder);
    const order = await this.orderRepo.save(newOrder);
    console.log('order', order);
    let totalPrice = 0;
    const productOrder = await Promise.all(
      products.map(async (product) => {
        const prod = await this.productService.getProductById(
          product.productId,
        );
        totalPrice += +prod.price;
        return await this.createOrderItem(order.id, product);
      }),
    );
    const orderWithTotalPrice = await this.orderRepo.save({
      ...newOrder,
      totalPrice,
    });
    console.log('productOrder', productOrder);
    return { ...orderWithTotalPrice, products: productOrder };
  }

  async getOrderById(orderId: number): Promise<Order[]> {
    return await this.orderRepo.find({
      id: orderId,
    });
  }

  async createOrUpdateOrderItem() {
    //
  }
}
