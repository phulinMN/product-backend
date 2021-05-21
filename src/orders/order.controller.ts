import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';
import { UserRequest } from 'src/common/custom-decorator';
import { IPaidOrder } from 'src/common/interfaces/order.interface';
import { TUser } from 'src/users/transforms/user.transform';
import { CreateOrderDto, PaidOrderDto, UpdateOrderDto } from './dtos/order.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';

@ApiTags('Order')
@Controller('Orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@UserRequest() user: TUser, @Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderUserById(id, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@UserRequest() user: TUser, @Body() payload: CreateOrderDto) {
    console.log(user.id, payload);
    return this.orderService.createOrder(user.id, payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/Slip')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadSlip(
    @UserRequest() user: TUser,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: IPaidOrder,
  ) {
    console.log(id);
    return this.orderService.paidOrder(id, { ...payload, file });
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
