import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity, OneToMany } from "typeorm";
import ICategoryPG from "./contracts/ICategoryPG";
import ISubcategoryPG from "./contracts/ISubcategoryPG";
import StatusCategory from "../contracts/StatusCategory";
import Subcategory from "./Subcategory.pg";

@Entity('category')
export default class Category extends BaseEntity implements ICategoryPG {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string

  @Column({type: 'varchar', nullable: false})
  slug!: string;

  @Column({type: "varchar", enum: StatusCategory, default: StatusCategory.ACTIVE})
  status!: StatusCategory;

  @Column({type: 'jsonb', nullable: true})
  subcategory!: ISubcategoryPG[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date;
}