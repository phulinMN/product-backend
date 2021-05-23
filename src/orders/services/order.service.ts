import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateOrder,
  ICreateOrderItem,
  IUploadSlipOrder,
  IUpdateOrder,
  OrderStatusEnum,
  IConfirmPaidPrice,
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
    const order = await this.orderRepo.save(newOrder);
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
    return { ...orderWithTotalPrice, products: productOrder };
  }

  async getOrderById(orderId: number): Promise<Order> {
    return await this.orderRepo.findOne({
      id: orderId,
    });
  }

  async getOrderUserById(orderId: number, userId: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      id: orderId,
    });
    // console.log("getOrderUserById", order,userId);
    if (order.userId !== userId) {
      throw new BadRequestException("It's not your order");
    }
    return order;
  }

  async updateOrder(orderId: number, userId: number, data: IUpdateOrder) {
    const { products } = data;
    const order = await this.getOrderById(orderId);
    if (order.userId !== userId) {
      throw new BadRequestException("It's not your order");
    }
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
    const updatedOrder = await this.orderRepo.save({
      id: orderId,
      ...order,
      ...data,
      totalPrice,
    });
    return { ...updatedOrder, products: productOrder };
  }

  async uploadSlip(orderId: number, userId: number, data: IUploadSlipOrder) {
    const order = await this.getOrderById(orderId);
    if (order.userId !== userId) {
      throw new BadRequestException("It's not your order");
    }
    if (order.status === OrderStatusEnum.CANCEL) {
      throw new BadRequestException("Order is cancelled");
    }
    const { file } = data;
    return await this.orderRepo.save({ ...order, slip: file.path });
  }

  async removeOrder(orderId: number) {
    const order = await this.getOrderById(orderId);
    return await this.orderRepo.save({
      ...order,
      status: OrderStatusEnum.CANCEL,
    });
  }

  async confirmPaidPrice(orderId: number, data: IConfirmPaidPrice) {
    const order = await this.getOrderById(orderId);
    if (+order.totalPrice === data.paidPrice) {
      return await this.orderRepo.save({
        ...order,
        paidPrice: data.paidPrice,
        status: OrderStatusEnum.SUCCESS,
      });
    }
    return await this.orderRepo.save({
      ...order,
      status: OrderStatusEnum.PENDING,
    });
  }
}
