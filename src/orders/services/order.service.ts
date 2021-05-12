import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateOrder,
  ICreateOrderItem,
  IUpdateOrder,
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

  async updateOrderItem(orderId: number, data: ICreateOrderItem) {
    const { quantity, productId } = data;
    const orderItem = await this.orderItemRepo.findOne({ orderId, productId });
    console.log('updateOrderItem', orderId, productId, orderItem);
    if (orderItem === undefined) {
      return await this.createOrderItem(orderId, data);
    }
    return await this.orderItemRepo.update(
      { id: orderItem.id },
      {
        quantity,
        productId,
      },
    );
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
        totalPrice += +prod.price * product.quantity;
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

  async getOrderById(orderId: number): Promise<Order> {
    return await this.orderRepo.findOne({
      id: orderId,
    });
  }

  async updateOrder(orderId: number, userId: number, data: IUpdateOrder) {
    const {
      addressCity,
      addressDistrict,
      addressProvince,
      addressStreet,
      addressZipcode,
      phone,
      products,
      status,
    } = data;
    const order = await this.getOrderById(orderId);
    let totalPrice = 0;
    let productOrder = [];
    if (products) {
      productOrder = await Promise.all(
        products.map(async (product) => {
          const prod = await this.productService.getProductById(
            product.productId,
          );
          totalPrice += +prod.price * product.quantity;
          return await this.updateOrderItem(orderId, product);
        }),
      );
    }
    console.log('update order', totalPrice);
    return await this.orderRepo.save({
      id: orderId,
      ...order,
      ...data,
      totalPrice,
    });
  }

  async paidOrder(orderId: number, slip: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    // TODO: Add slip path
    return await this.orderRepo.save({ order, slip });
  }

  async removeOrder(orderId: number) {
    const order = await this.getOrderById(orderId);
    // TODO: Add slip path
    return await this.orderRepo.save({
      ...order,
      status: OrderStatusEnum.CANCEL,
    });
  }
}
