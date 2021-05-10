import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOkResponse()
  @Get(':id')
  getOrder(@Param() id: number): Promise<Order[]> {
    return this.orderService.getOrderById(id);
  }


  @ApiOkResponse()
  @Post()
  createOrder() {
    // TODO: Create Order
  }
}
