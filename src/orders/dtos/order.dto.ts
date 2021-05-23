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

export class UpdateOrderDto {
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
  @ValidateIf(({ products }) => products !== undefined)
  @IsArray()
  @Type(() => CreateOrderItemDto)
  products?: ICreateOrderItem[];

  @ApiProperty()
  @ValidateIf(({ addressStreet }) => addressStreet !== undefined)
  @IsString()
  addressStreet?: string;

  @ApiProperty()
  @ValidateIf(({ addressProvince }) => addressProvince !== undefined)
  @IsString()
  addressProvince?: string;

  @ApiProperty()
  @ValidateIf(({ addressDistrict }) => addressDistrict !== undefined)
  @IsString()
  addressDistrict?: string;

  @ApiProperty()
  @ValidateIf(({ addressCity }) => addressCity !== undefined)
  @IsString()
  addressCity?: string;

  @ApiProperty()
  @ValidateIf(({ addressZipcode }) => addressZipcode !== undefined)
  @IsString()
  addressZipcode?: string;

  @ApiProperty()
  @ValidateIf(({ phone }) => phone !== undefined)
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'pending' })
  @ValidateIf(({ status }) => status !== undefined)
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}

export class PaidOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  paidPrice: number;
}
