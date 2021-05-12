import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';
import { UserRequest } from 'src/common/custom-decorator';
import { ICreateOrder } from 'src/common/interfaces/order.interface';
import { TUser } from 'src/users/transforms/user.transform';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';

@ApiTags('Order')
@Controller('Orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @ApiOkResponse()
  // @Get(':id')
  // getOrderItemById() {
  //   //
  // }

  // @ApiOkResponse()
  // @Post()
  // updateOrderItem() {
  //   //
  // }

  // @ApiOkResponse()
  // @Get(':id')
  // getOrder(@Param() id: number): Promise<Order[]> {
  //   return this.orderService.getOrderById(id);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@UserRequest() user: TUser, @Body() payload: CreateOrderDto) {
    console.log(user.id, payload);
    return this.orderService.createOrder(user.id, payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOrder(
    @Param('id') id: number,
    @UserRequest() user: TUser,
    @Body() payload: UpdateOrderDto,
  ) {
    console.log(user.id, payload);
    return this.orderService.updateOrder(id, user.id, payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('Cancel/:id')
  cancelOrderById(@Param('id') id: number, @UserRequest() user: TUser) {
    console.log(user.id);
    return this.orderService.removeOrder(id);
  }
}
