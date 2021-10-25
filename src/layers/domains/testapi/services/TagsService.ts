import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { User } from 'src/layers/storage/postgres/entities/User';
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async createOne(user: any, tag: Omit<Tag, 'id' | 'creator'>) {
    const creator = await this.usersRepository.findOne({ username: user.username });
    // todo тут фиксануть
    tag['creator'] = creator.uid;
    await this.tagsRepository.save(tag);
    console.log('Добавлен тэг: ', tag);
    return true;
  }
}
