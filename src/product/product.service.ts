import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './user.entity';

@Injectable()
export class ProductService {
  constructor( @InjectRepository(Product) 
  private productsRepository: Repository<Product>, ) {} 
  findAllProducts(): Promise<Product[]> 
  { return this.productsRepository.find(); } async findProduct(id: number): Promise<Product> { const product = await this.productsRepository.findOneBy({ id }); if (!product) { throw new NotFoundException( `Le produit avec ID ${id} est introuvable`, ); } return product; } newProduct(product: Partial<Product>): Promise<Product> { const newProduct = this.productsRepository.create(product); return this.productsRepository.save(newProduct); } async updateProduct(id: number, product: Partial<Product>): Promise<Product> { await this.productsRepository.update(id, product); return this.findProduct(id); } async deleteProduct(id: number): Promise<void> { await this.productsRepository.delete(id); } 
}
