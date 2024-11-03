import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import ICommentPG from "./contracts/ICommentPG";
import Post from "../../post/model/Post.pg";
import User from "../../user/model/User.pg";
import CommentStatus from "./contracts/CommentStatus";

@Entity('comment')
export default class Comment extends BaseEntity implements ICommentPG {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({name: 'user'})
  user!: User;

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({name: 'post'})
  post!: Post;

  @Column({type: 'varchar', length: 50})
  title!: string;

  @Column({type: 'text'})
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({type: 'varchar', enum: CommentStatus, default: CommentStatus.PENDING})
  status!: CommentStatus;
}