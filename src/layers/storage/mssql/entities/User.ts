import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ nullable: false, default: 'null' })
  email: string;

  @Column({ nullable: false, default: 'null', unique: true })
  username: string;

  @Column({ nullable: false, default: 'null' })
  password: string;
}
