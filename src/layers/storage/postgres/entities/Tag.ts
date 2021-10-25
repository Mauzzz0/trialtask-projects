import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ownTags)
  creator: User;

  @Column({ type: 'varchar', length: 40, default: 'null', unique: true })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  sortOrder: number;
}
