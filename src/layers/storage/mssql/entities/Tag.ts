import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'null' })
  creator: string;

  @Column({ nullable: false, default: 'null' })
  name: string;

  @Column({ nullable: false, default: 0 })
  sortOrder: number;
}
