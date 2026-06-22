import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './user.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findProduct(+id);
  }

  @Post()
  create(@Body() product: Product) {
    return this.productService.newProduct(product);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.updateProduct(+id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
