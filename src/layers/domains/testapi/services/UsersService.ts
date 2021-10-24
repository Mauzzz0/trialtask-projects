import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/layers/storage/mssql/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(filter: Record<string, any>): Promise<Omit<User, 'id'>> {
    const r = await this.usersRepository.findOne(filter);
    console.log('find');
    if (!r) {
      throw new NotFoundException();
    }

    return r;
  }

  async createOne(params: { id: number; role_id: number; username: string; password: string }) {
    try {
      await this.usersRepository.save(params);
      console.log('Добавлен пользователь: ', params);
      return true;
    } catch (e: any) {
      console.log('Ошибка добавления пользователя: ', params);
      return { e };
    }
  }
}
