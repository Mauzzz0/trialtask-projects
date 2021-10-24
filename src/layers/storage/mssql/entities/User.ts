import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: '2' })
  role_id: number;

  @Column({ nullable: false, default: 'DEFAULT', unique: true })
  username: string;

  @Column({ nullable: false, default: 'DEFAULT' })
  password: string;

  @Column({ nullable: false, default: 'DEFAULT' })
  name: string;
}
