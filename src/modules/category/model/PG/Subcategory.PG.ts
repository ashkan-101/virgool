import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import ISubcategoryPG from "./contracts/ISubcategoryPG";
import Category from "./Category.PG";
import Post from "../../../post/model/Post.pg";


@Entity('subcategory')
export default class Subcategory extends BaseEntity implements ISubcategoryPG {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(() => Category, category => category.subcategory, {onDelete: 'CASCADE'})
  category!: Category

  @OneToMany(()=> Post, post => post.subcategory)
  posts!: Post[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date;
}