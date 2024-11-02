import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import PostStatus from "../contracts/PostStatus";
import User from '../../user/model/User.pg'
import IPostPG from "./contracts/IPostPG";
 
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

  @Column({type: 'jsonb', nullable: true})
  likes!: string[];

  @Column({type: 'varchar', nullable: true})
  slug!: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'author'})
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}