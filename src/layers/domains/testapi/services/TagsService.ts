import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { UsersService } from './UsersService';
import { FindOpts } from 'src/layers/storage/postgres/types/FindUserOpts';
import { TagRelations } from 'src/layers/storage/postgres/types/TagRelEnum';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    private usersService: UsersService,
    private connection: Connection,
  ) {}

  async findOneByFilter(filter: Record<string, any>, opts?: FindOpts): Promise<any> {
    const r = await this.tagsRepository.findOne({ where: filter, relations: opts?.rel });

    return r;
  }

  async findOneById(id: number, opts?: FindOpts): Promise<any> {
    const r = await this.tagsRepository.findOne({
      where: { id: id },
      relations: opts?.rel,
    });

    return r;
  }

  async createOne(user: any, tag: Omit<Tag, 'id' | 'creator' | 'users'>) {
    const creator = await this.usersService.findOneByUsername(user.username);
    // todo тут фиксануть ненорм
    tag['creator'] = creator.uid;
    await this.tagsRepository.save(tag);
    console.log('Добавлен тэг: ', tag);
    return true;
  }

  async showTag(id: number) {
    const tag = await this.findOneById(id, { rel: [TagRelations.creator] });

    if (!tag) throw new NotFoundException();
    // todo отсюда убрать creator.password
    return tag;
  }

  async update(user: any, id: number, body: Partial<Tag>) {
    const tag = await this.findOneById(id, { rel: [TagRelations.creator] });

    if (!tag) throw new NotFoundException();
    if (tag.creator.username != user.username) throw new ForbiddenException();

    await this.connection
      .createQueryBuilder()
      .update(Tag)
      .set(body)
      .where('id = :id', { id })
      .execute();

    const r = this.findOneById(id);

    return r;
  }

  async delete(user: any, id: number) {
    // todo сюда проверку на если tag == udnefined
    const tag = await this.findOneById(id, { rel: [TagRelations.creator] });

    if (!tag) throw new NotFoundException();
    if (tag.creator.username != user.username) throw new ForbiddenException();

    await this.tagsRepository.delete(tag);

    return true;
  }
}
