import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import {randomBytes} from 'crypto'
import Gender from "../contracts/Gender";
import IUserPG from "./contracts/IUserPG";
import Post from "../../post/model/Post.pg";

@Entity('user')
export default class User extends BaseEntity implements IUserPG{
  @PrimaryGeneratedColumn('uuid')
  _id!: string

  @Column({type: 'varchar', length: 15, nullable: true})
  firstName!:string

  @Column({type: 'varchar', length: 20, nullable: true})
  lastName!: string

  @Column({type: 'varchar', length: 20, default: `user_${randomBytes(3).toString('hex')}`})
  userName!: string

  @Column({type: 'text', nullable: true})
  bio!: string

  @Column({type: 'text', nullable: true})
  avatar!: string

  @Column({type: "enum", enum: Gender, nullable: true})
  gender!: Gender

  @Column({type: 'varchar', length: 11, nullable: true})
  mobile!: string

  @Column({type: 'varchar', length: 30, unique: true, nullable: true})
  email!: string

  @Column({type: 'varchar', length: 100, nullable: true})
  password!: string

  @Column('text', {array: true, nullable: true})
  folowing!: string[]

  @Column('text', {array: true, nullable: true})
  folowers!: string[]

  @Column({type: 'date', nullable: true})
  birthday!: Date

  @OneToMany(() => Post, post => post.author)
  posts!: Post[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}