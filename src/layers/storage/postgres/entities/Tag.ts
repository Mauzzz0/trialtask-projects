import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'user_uid' })
  creator: User;

  @Column({ nullable: false, default: 'null' })
  name: string;

  @Column({ nullable: false, default: 0 })
  sortOrder: number;
}
