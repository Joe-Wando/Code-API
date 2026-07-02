import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
