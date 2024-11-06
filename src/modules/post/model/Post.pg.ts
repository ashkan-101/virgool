import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import PostStatus from "../contracts/PostStatus";
import User from '../../user/model/User.pg'
import IPostPG from "./contracts/IPostPG";
import Comment from "../../comment/model/Comment.pg";
import Subcategory from "../../category/model/PG/Subcategory.PG";
 
@Entity('post')
export default class Post extends BaseEntity implements IPostPG {
  @PrimaryGeneratedColumn('uuid')
  _id!: string

  @Column({type: 'varchar', length:30, nullable: true})
  title!: string;

  @Column({type: 'text', nullable: true})
  body!: string;

  @Column({type: 'jsonb', nullable: true})
  gallery!: string[];

  @Column({type: 'jsonb', nullable: true})
  tags!: string[];

  @Column({type: 'varchar', enum: PostStatus, default: PostStatus.DRAFT})
  status!: PostStatus;

  @Column({type: 'jsonb', default: []})
  likes!: string[];

  @Column({type: 'varchar', nullable: true})
  slug!: string;

  @Column({type: 'int', default: 0})
  views!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;


  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'author'})
  author!: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[]

  @ManyToOne(() => Subcategory , subcategory => subcategory.posts)
  @JoinColumn({name: 'subcategory'})
  subcategory!: Subcategory
}