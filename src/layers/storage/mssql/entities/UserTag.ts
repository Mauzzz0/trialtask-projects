import { Entity, Column } from 'typeorm';

@Entity()
export class UserTag {
  @Column({ nullable: false, default: 'null' })
  userUid: string;

  @Column({ nullable: false, default: 'null' })
  tagId: number;
}
