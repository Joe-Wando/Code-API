import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';

type ProductInput = Partial<Product> & {
  categoryId?: number;
  categoryName?: string;
};

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Recuperer tous les produits dans la base de données (avec leur categorie)
  findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ relations: { category: true } });
  }

  // Pour recupérer un seul produit (avec sa categorie)
  async findProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException(`Le produit avec ID ${id} est introuvable`);
    }
    return product;
  }

  // Pour ajouter un produit dans la base de données
  async newProduct(product: ProductInput): Promise<Product> {
    const { categoryId, categoryName, ...data } = product;
    const newProduct = this.productsRepository.create(data);
    if (categoryId) {
      newProduct.category = await this.findCategory(categoryId);
    } else if (categoryName) {
      newProduct.category = await this.findOrCreateCategory(categoryName);
    }
    return this.productsRepository.save(newProduct);
  }

  // Pour modifier un produit avec son id
  async updateProduct(id: number, product: ProductInput): Promise<Product> {
    const { categoryId, categoryName, ...data } = product;
    const existingProduct = await this.findProduct(id);
    Object.assign(existingProduct, data);
    if (categoryId) {
      existingProduct.category = await this.findCategory(categoryId);
    } else if (categoryName) {
      existingProduct.category = await this.findOrCreateCategory(categoryName);
    }
    return this.productsRepository.save(existingProduct);
  }

  // Supprimer un produit avec son ID
  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  private async findCategory(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`La categorie avec ID ${id} est introuvable`);
    }
    return category;
  }

  private async findOrCreateCategory(nom: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ nom });
    if (category) {
      return category;
    }
    const newCategory = this.categoriesRepository.create({ nom });
    return this.categoriesRepository.save(newCategory);
  }
}
