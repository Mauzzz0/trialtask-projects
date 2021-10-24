import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailIncorrectError } from 'src/common/rules/exceptions/EmailIncorrectError';
import { PasswordToWeakError } from 'src/common/rules/exceptions/PasswordToWeakError';
import { EmailRegex } from 'src/layers/gateways/rest/testapi/utils/utils';
import { User } from 'src/layers/storage/postgres/entities/User';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOneComp(filter: Record<string, any>): Promise<Omit<User, 'uid'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find pwd');
    if (!r) {
      throw new NotFoundException();
    }

    return r;
  }

  async findOneCompWithoutPwd(
    filter: Record<string, any>,
  ): Promise<Omit<User, 'uid' | 'password'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find no pwd');
    if (!r) {
      throw new NotFoundException();
    }

    const { password, ...res } = r;

    return res;
  }

  async findOneFull(filter: Record<string, any>): Promise<any> {
    const r = await this.usersRepository.findOne(filter);
    console.log(r);
    return null;
  }

  async testFind(where: { username: string }): Promise<any> {
    const [rows] = await this.usersRepository.find({
      where,
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          tags: 'user.tags',
        },
      },
    });

    console.log(rows);

    return rows;
  }

  async createOne(user: Omit<User, 'uid' | 'tags'>) {
    // todo
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
