import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity, OneToMany } from "typeorm";
import ICategoryPG from "./contracts/ICategoryPG";
import StatusCategory from "../contracts/StatusCategory";
import Subcategory from "./Subcategory.PG";

@Entity('category')
export default class Category extends BaseEntity implements ICategoryPG {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string

  @Column({type: "varchar", enum: StatusCategory, default: StatusCategory.ACTIVE})
  status!: StatusCategory;

  @OneToMany(()=> Subcategory, subcategory => subcategory.category)
  subcategory!: Subcategory[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date;
}