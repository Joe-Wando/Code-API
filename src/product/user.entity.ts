
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
