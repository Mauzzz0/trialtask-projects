import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
  async createOne(user: any, tag: Omit<Tag, 'id' | 'creator' | 'users'>) {
    const creator = await this.usersRepository.findOne({ username: user.username });
    // todo тут фиксануть ненорм
    tag['creator'] = creator.uid;
    await this.tagsRepository.save(tag);

    return true;
  }

  async showTag(filter: Record<string, any>) {
    const [tag] = await this.tagsRepository.find({
      where: filter,
      join: {
        alias: 'tag',
        leftJoinAndSelect: {
          users: 'tag.creator',
        },
      },
    });

    if (!tag) {
      throw new NotFoundException();
    }
    // todo отсюда убрать creator.password
    return tag;
  }

  async delete(user: any, filter: Record<string, any>) {
    // todo сюда проверку на если tag == udnefined
    const [tag] = await this.tagsRepository.find({
      where: filter,
      join: {
        alias: 'tag',
        leftJoinAndSelect: {
          users: 'tag.creator',
        },
      },
    });

    if (!tag) {
      throw new NotFoundException();
    }
    // тут заменить на проверку по uid когда uid будет в req.user
    if (tag.creator.username != user.username) {
      // тут свою форбиддент
      throw new ForbiddenException();
    }

    await this.tagsRepository.delete(filter);

    return true;
  }
}
