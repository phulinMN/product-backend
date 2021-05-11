import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import {
  ICreateOrderItem,
  OrderStatusEnum,
} from 'src/common/interfaces/order.interface';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
export class CreateOrderDto {
  @ApiProperty({
    example: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 2,
      },
    ],
  })
  @IsArray()
  @Type(() => CreateOrderItemDto)
  products: ICreateOrderItem[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressStreet: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressProvince: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressDistrict: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressZipcode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'pending' })
  @ValidateIf(({ status }) => status !== undefined)
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}
