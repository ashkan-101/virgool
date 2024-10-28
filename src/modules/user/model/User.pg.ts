import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import IBaseUser from "./contracts/IBaseUser";
import Gender from "../contracts/Gender";
import {randomBytes} from 'crypto'

@Entity('user')
export default class User extends BaseEntity implements IBaseUser{
  @PrimaryGeneratedColumn('uuid')
  id!: string

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

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}