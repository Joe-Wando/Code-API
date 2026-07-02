import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor( @InjectRepository(Product) 
  private productsRepository: Repository<Product>, ) {} 

  // Recuperer tous les produits dans la base de données
  findAllProducts(): Promise<Product[]> 
  { return this.productsRepository.find(); } 
  
  // Pour recupérer un seul produit
  async findProduct(id: number): Promise<Product> { 
    const product = await this.productsRepository.findOneBy({ id }); if (!product) { 
      throw new NotFoundException( `Le produit avec ID ${id} est introuvable`, ); } 
      return product; } 

      // Pour ajouter un produit dans la base de données
      newProduct(product: Partial<Product>): Promise<Product> { 
        const newProduct = this.productsRepository.create(product); return this.productsRepository.save(newProduct); } 

        // Pour modifier un produit avec son id
        async updateProduct(id: number, product: Partial<Product>): Promise<Product> { 
          await this.productsRepository.update(id, product); 
          return this.findProduct(id); } 

          // Supprimer un produit avec son ID
          async deleteProduct(id: number): Promise<void> { await this.productsRepository.delete(id); } 
}
