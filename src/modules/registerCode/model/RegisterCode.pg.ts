import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import IRegisterCodePG from "./contracts/IRegisterCodePG";

@Entity('registerCode')
export default class RegisterCode extends BaseEntity implements IRegisterCodePG{
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column({type: 'varchar', nullable: false})
  code!: string;

  @Column({type: 'numeric', default: Date.now() + 120000})
  expireAt!: number;

  @Column({type: 'varchar', length: 15, nullable: false})
  mobile!: string;
}