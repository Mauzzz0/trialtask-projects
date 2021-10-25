import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Tag } from './Tag';
import { UserTag } from './UserTag';

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

  @OneToMany(() => Tag, (tag) => tag.creator, { cascade: true })
  myTags: Tag[];

  @OneToMany(() => UserTag, (usertag) => usertag.tag, { cascade: true })
  tagList: UserTag[];
}
