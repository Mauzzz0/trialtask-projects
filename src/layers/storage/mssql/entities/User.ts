import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tag } from './Tag';

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

  @OneToMany((type) => Tag, (tag) => tag.creator, { cascade: true })
  tags: Tag[];
}
