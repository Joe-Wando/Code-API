import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Recuperer toutes les categories dans la base de données
  findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  // Pour recupérer une seule categorie
  async findCategory(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`La categorie avec ID ${id} est introuvable`);
    }
    return category;
  }

  // Pour ajouter une categorie dans la base de données
  newCategory(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  // Pour modifier une categorie avec son id
  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    return this.findCategory(id);
  }

  // Supprimer une categorie avec son ID
  async deleteCategory(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
