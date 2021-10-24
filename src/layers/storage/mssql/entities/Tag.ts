import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ referencedColumnName: 'uid' })
  creator: string;

  @Column({ nullable: false, default: 'null' })
  name: string;

  @Column({ nullable: false, default: 0 })
  sortOrder: number;
}
