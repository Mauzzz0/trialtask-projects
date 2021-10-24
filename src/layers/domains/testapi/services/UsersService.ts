import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/layers/storage/mssql/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(filter: Record<string, any>): Promise<Omit<User, 'uid'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find pwd');
    if (!r) {
      throw new NotFoundException();
    }

    return r;
  }

  async findOneWithoutPwd(filter: Record<string, any>): Promise<Omit<User, 'uid' | 'password'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find no pwd');
    if (!r) {
      throw new NotFoundException();
    }

    const { password, ...res } = r;

    return res;
  }

  async createOne(user: Omit<User, 'uid'>) {
    await this.usersRepository.save(user);
    console.log('Добавлен пользователь: ', user);
    return true;
  }
}
