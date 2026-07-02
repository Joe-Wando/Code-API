import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  findAllCategories(): Promise<Category[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  findCategory(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findCategory(id);
  }

  @Post()
  newCategory(@Body() category: Partial<Category>): Promise<Category> {
    return this.categoriesService.newCategory(category);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() category: Partial<Category>,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
