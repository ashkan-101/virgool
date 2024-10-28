import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import IBasePost from "./contracts/IBasePost";
import PostStatus from "../contracts/PostStatus";
import User from '../../user/model/User.pg'
 
@Entity('post')
export default class Post extends BaseEntity implements IBasePost {
  @PrimaryGeneratedColumn('uuid')
  _id!: string

  @Column({type: 'varchar', length:30, nullable: true})
  title!: string;

  @Column({type: 'text', nullable: true})
  body!: string;

  @Column('text', {array: true, nullable: true})
  gallery!: string[];

  @Column('text', {array: true, nullable: true})
  tags!: string[];

  @Column({type: 'enum', enum: PostStatus, default: PostStatus.DRAFT})
  status!: string;

  @Column('text', {array: true, nullable: true})
  likes!: string[];

  @Column({type: 'varchar', nullable: true})
  slug!: string;

  @ManyToOne(() => User, user => user.posts)
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}