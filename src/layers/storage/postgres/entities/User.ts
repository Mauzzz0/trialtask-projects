import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 100, nullable: false, default: 'null', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: false, default: 'null', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false, default: 'null' })
  password: string;

  @OneToMany(() => Tag, (tag) => tag.creator, { onDelete: 'CASCADE' })
  ownTags: Tag[];

  @ManyToMany(() => Tag, { onDelete: 'CASCADE' })
  @JoinTable()
  tagList: Tag[];
}
