// import { Entity, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
// import { Tag } from './Tag';
// import { User } from './User';
// // todo накинуть unique или дабл PK, сейчас дубликаты
// @Entity()
// export class UserTag {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, (user) => user.uid)
//   @JoinColumn({ name: 'user' })
//   user: User;

//   @ManyToOne(() => Tag, (tag) => tag.id)
//   @JoinColumn({ name: 'tag' })
//   tag: Tag;
// }
