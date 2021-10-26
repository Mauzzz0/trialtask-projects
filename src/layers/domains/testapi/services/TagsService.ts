import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, FindManyOptions, Repository } from 'typeorm';
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

  async findPagination(q: {
    offset: number;
    length: number;
    sortByOrder: string;
    sortByName: string;
  }): Promise<any> {
    const { offset, length, sortByOrder, sortByName } = q;

    const findOption: FindManyOptions<Tag>['order'] = {};

    if (sortByOrder == 'true') findOption.sortOrder = 1;
    if (sortByName == 'true') findOption.name = 1;

    // findOption.sortOrder = sortByOrder == 'true' ? 'ASC' : 'DESC';
    // findOption.name = sortByName == 'true' ? 'ASC' : 'DESC';

    const [list, count] = await this.tagsRepository.findAndCount({
      relations: [TagRelations.creator],
      skip: offset,
      take: length,
      order: findOption,
    });

    const r = {
      total: count,
      limit: length,
      offset,
      items: list,
    };

    return r;
  }

  async createOne(user: any, tag: Partial<Tag>) {
    const creator = await this.usersService.findOneByUsername(user.username);
    tag.creator = creator.uid;

    await this.tagsRepository.save(tag);

    return { result: true };
  }

  async showTag(id: number) {
    const tag = await this.findOneById(id, { rel: [TagRelations.creator] });

    if (!tag) throw new NotFoundException();

    // ну оно хотя бы работает))
    delete tag.creator.password;

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
    const tag = await this.findOneById(id, { rel: [TagRelations.creator] });

    if (!tag) throw new NotFoundException();
    if (tag.creator.username != user.username) throw new ForbiddenException();

    await this.tagsRepository.delete(tag);

    return { result: true };
  }
}
