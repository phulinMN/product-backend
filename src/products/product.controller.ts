import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse()
  @Get()
  getAll() {
    return this.productService.getAllProduct();
  }

  @ApiOkResponse()
  @Get(':id')
  get(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @ApiOkResponse()
  @Post()
  create(@Body() product: Product) {
    return this.productService.addProduct(product);
  }

  @ApiOkResponse()
  @Put(':id')
  update(@Param('id') id: number, @Body() product: Product) {
    return this.productService.updateProduct({ id, ...product });
  }

  @ApiOkResponse()
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.productService.removeProduct(id);
  }
}
