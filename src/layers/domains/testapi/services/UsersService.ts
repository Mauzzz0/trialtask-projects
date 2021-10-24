import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/layers/storage/mssql/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(filter: Record<string, any>): Promise<Omit<User, 'uid'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find');
    if (!r) {
      throw new NotFoundException();
    }

    return r;
  }

  async createOne(user: Omit<User, 'uid'>) {
    try {
      await this.usersRepository.save(user);
      console.log('Добавлен пользователь: ', user);
      return true;
    } catch (e: any) {
      console.log('Ошибка добавления пользователя: ', user);
      return { e };
    }
  }
}
