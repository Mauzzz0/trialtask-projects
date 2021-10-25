import { hash } from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailIncorrectError } from 'src/common/rules/exceptions/EmailIncorrectError';
import { PasswordToWeakError } from 'src/common/rules/exceptions/PasswordToWeakError';
import { EmailRegex } from 'src/layers/gateways/rest/testapi/utils/utils';
import { User } from 'src/layers/storage/postgres/entities/User';
import { Connection, Repository } from 'typeorm';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
// import { UserTag } from 'src/layers/storage/postgres/entities/UserTag';
import { FindUserOpts } from 'src/layers/storage/postgres/types/FindUserOpts';
import { UserRelations } from 'src/layers/storage/postgres/types/UserRelEnum';
@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>, // @InjectRepository(UserTag) private usertagRepository: Repository<UserTag>,
  ) {}

  public async encryptPassword(password: string): Promise<string> {
    return await hash(password, 6);
  }

  async findOneByFilter(filter: Record<string, any>, options?: FindUserOpts): Promise<any> {
    const r = await this.usersRepository.findOne({ where: filter, relations: options?.rel });

    return r;
  }

  async findOneById(id: number, opts?: FindUserOpts): Promise<any> {
    const r = await this.usersRepository.findOne({
      where: { uid: id },
      relations: opts?.rel,
    });

    return r;
  }

  async findOneByEmail(email: string, options?: FindUserOpts): Promise<any> {
    const r = await this.usersRepository.findOne({
      where: { email },
      relations: options?.rel,
    });

    return r;
  }

  async findOneByUsername(username: string, options?: FindUserOpts): Promise<any> {
    const r = await this.usersRepository.findOne({
      where: { username },
      relations: options?.rel,
    });

    return r;
  }

  async profile(filter: Record<string, any>): Promise<User> {
    // Вообще по-хорошему инжектить сюда dbService и уже вызывать его методы поиска
    const [rows] = await this.usersRepository.find({
      where: filter,
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          tagList: 'user.tagList',
        },
      },
    });

    console.log(rows);

    return rows;
  }

  async tagsForUser(filter: Record<string, any>): Promise<Tag[]> {
    // Вообще по-хорошему инжектить сюда dbService и уже вызывать его методы поиска
    const [rows] = await this.usersRepository.find({
      where: filter,
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          tags: 'user.ownTags',
        },
      },
    });

    return rows.ownTags;
  }

  async addTasgToUser(user: any, ids: number[]) {
    // todo убрать any
    // const rows = await this.usertagRepository.find({})
    // const { username } = user;
    // const userBd = await this.usersRepository.findOne({
    //   where: { username },
    // });
    // body.tags.map(async (tagId) => {
    //   // todo сделать откат если айди не найден
    //   const tagBd = await this.tagsRepository.findOne({ id: tagId });
    //   const a1 = new UserTag();
    //   a1.tag = tagBd;
    //   a1.user = userBd;
    //   await this.usertagRepository.save(a1);
    // });
    // return true;
    const { uid } = await this.findOneByUsername(user.username);

    const qr = this.connection.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      // @todo UnhandledPromiseRejectionWarning
      const tagList = await Promise.all(
        ids.map(async (id) => {
          const r = await qr.manager.findOne(Tag, id);
          if (!r) throw new NotFoundException(); // todo свой эррор
          return r;
        }),
      );
      await qr.manager.createQueryBuilder().relation(User, 'tagList').of(uid).add(tagList);
      await qr.commitTransaction();
    } catch (e: any) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }

    const r = await this.findOneById(uid, { rel: [UserRelations.tagList] });

    return r;
  }

  async removeUserTag(filter: Record<string, any>): Promise<any> {
    // Вообще по-хорошему инжектить сюда dbService и уже вызывать его методы поиска
    // const { username, tagId } = filter;
    // const [rows] = await this.usersRepository.find({
    //   where: filter,
    //   join: {
    //     alias: 'user',
    //     leftJoinAndSelect: {
    //       tags: 'user.tags',
    //     },
    //   },
    // });
    // console.log(rows);
    // return rows.myTags;
  }

  async remove(filter: Record<string, any>): Promise<any> {
    // Вообще по-хорошему инжектить сюда dbService и уже вызывать его методы поиска
    const [user] = await this.usersRepository.find({
      where: filter,
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          tags: 'user.tags',
        },
      },
    });

    this.usersRepository.remove(user);

    // console.log(rows);

    return true;
  }

  async createOne(user: Omit<User, 'uid' | 'tagList' | 'ownTags'>) {
    // todo привести к норм виду схему
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const passwordValidator = require('password-validator');
    const schema = new passwordValidator();

    schema.has().uppercase().has().lowercase().has().digits(1).has().not().spaces().is().min(8);

    if (!schema.validate(user.password)) {
      throw new PasswordToWeakError();
    }
    if (!new RegExp(EmailRegex, 'gi').test(user.email)) {
      throw new EmailIncorrectError();
    }

    await this.usersRepository.save(user);
    console.log('Добавлен пользователь: ', user);
    return true;
  }
}
