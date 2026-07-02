
import { Category } from 'src/category/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  nomproduct: string | undefined;

  @Column()
  prix: number | undefined;

  @Column()
  quantite:number | undefined;

  @Column()
  description:string | undefined;

  @Column({ default: true })
  disponible: boolean | undefined;

  @ManyToOne(() => Category, (category) => category.products, {
      onDelete: 'SET NULL', 
  }) category: Category;
}
