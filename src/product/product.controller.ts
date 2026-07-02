import { Controller, Get, Post, Body, Param, Delete, Patch, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  // constructor(private readonly productService: ProductService) {}

  // @Get()
  // findAll() {
  //   return this.productService.findAllProducts();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findProduct(+id);
  // }

  // @Post()
  // create(@Body() product: Product) {
  //   return this.productService.newProduct(product);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() product: Product) {
  //   return this.productService.updateProduct(+id, product);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.productService.deleteProduct(+id);
  // }
  constructor(private readonly productsService: ProductService) {} 

  @Get() findAllProducts(): Promise<Product[]> 
  { return this.productsService.findAllProducts(); } 

  @Get(':id') findProduct(@Param('id') id: number): Promise<Product> { 
    return this.productsService.findProduct(id); } 

    @Post() NewProduct(@Body() product: Partial<Product>): Promise<Product> {
       return this.productsService.newProduct(product); } 
       
       @Put(':id') updateProduct( @Param('id') id: number, @Body() product: Partial<Product>, ): Promise<Product> 
       { return this.productsService.updateProduct(id, product); } 
       
       @Delete(':id') deleteProduct(@Param('id') id: number): Promise<void> { 
        return this.productsService.deleteProduct(id); } 
}
