import { hash } from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailIncorrectError } from 'src/common/rules/exceptions/EmailIncorrectError';
import { PasswordToWeakError } from 'src/common/rules/exceptions/PasswordToWeakError';
import { EmailRegex } from 'src/layers/gateways/rest/testapi/utils/utils';
import { User } from 'src/layers/storage/postgres/entities/User';
import { Repository } from 'typeorm';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { UserTag } from 'src/layers/storage/postgres/entities/UserTag';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    @InjectRepository(UserTag) private usertagRepository: Repository<UserTag>,
  ) {}

  public async encryptPassword(password: string): Promise<string> {
    return await hash(password, 6);
  }

  async findOneFull(filter: Record<string, any>): Promise<any> {
    const r = await this.usersRepository.findOne(filter);
    console.log('full', r);
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
          tags: 'user.myTags',
        },
      },
    });

    console.log(rows);

    return rows.myTags;
  }

  async addTagToUser(user: any, body: any) {
    // todo убрать any
    // const rows = await this.usertagRepository.find({})
    const { username } = user;
    const userBd = await this.usersRepository.findOne({
      where: { username },
    });

    body.tags.map(async (tagId) => {
      // todo сделать откат если айди не найден
      const tagBd = await this.tagsRepository.findOne({ id: tagId });

      const a1 = new UserTag();
      a1.tag = tagBd;
      a1.user = userBd;

      await this.usertagRepository.save(a1);
    });

    return true;
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

  async createOne(user: Omit<User, 'uid' | 'tagList' | 'myTags'>) {
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
