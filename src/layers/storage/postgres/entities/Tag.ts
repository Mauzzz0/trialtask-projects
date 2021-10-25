import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { UserTag } from './UserTag';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.myTags)
  @JoinColumn({ name: 'creator' })
  creator: User;

  @Column({ nullable: false, default: 'null' })
  name: string;

  @Column({ nullable: false, default: 0 })
  sortOrder: number;

  @OneToMany(() => UserTag, (usertag) => usertag.tag, { cascade: true })
  users: UserTag[];
}
