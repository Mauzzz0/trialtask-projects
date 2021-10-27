import { hash } from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordToWeakError } from 'src/common/rules/exceptions/PasswordToWeakError';
import { User } from 'src/layers/storage/postgres/entities/User';
import { Connection, Repository } from 'typeorm';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { FindOpts } from 'src/layers/storage/postgres/types/FindUserOpts';
import { UserRelations } from 'src/layers/storage/postgres/types/UserRelEnum';
import { ResultPayload } from 'src/common/layers/contracts/dto/testapi/ResultPayload';
import { TagWithCreatorUidDto } from 'src/common/layers/contracts/dto/testapi/TagDto';
import { UserReqDto } from 'src/common/layers/contracts/dto/testapi/UserReqDto';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async encryptPassword(password: string): Promise<string> {
    return await hash(password, 6);
  }

  async findOneByFilter(
    filter: Record<string, any>,
    opts?: FindOpts,
    pwd?: boolean,
  ): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({ where: filter, relations: opts?.rel });

    if (!pwd) {
      const { password, ...r } = user;
      return r;
    }

    return user;
  }

  async findOneById(id: string, opts?: FindOpts, pwd?: boolean): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { uid: id },
      relations: opts?.rel,
    });

    if (!pwd) {
      const { password, ...r } = user;
      return r;
    }

    return user;
  }

  async findOneByEmail(email: string, opts?: FindOpts, pwd?: boolean): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: opts?.rel,
    });

    if (!pwd) {
      const { password, ...r } = user;
      return r;
    }

    return user;
  }

  async findOneByUsername(
    username: string,
    opts?: FindOpts,
    pwd?: boolean,
  ): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: opts?.rel,
    });

    if (!pwd) {
      const { password, ...r } = user;
      return r;
    }

    return user;
  }

  async addTasgToUser(user: UserReqDto, ids: number[]): Promise<Partial<User>> {
    const { uid } = await this.findOneByUsername(user.username);

    const qr = this.connection.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    // try-catch используется для ролбэка транзакции. В остальных случаях ошибку перехватит HttpExceptionFilter
    let err: Error;
    try {
      // @todo разрешить UnhandledPromiseRejectionWarning
      const tagList = await Promise.all(
        ids.map(async (id) => {
          const r = await qr.manager.findOne(Tag, id);
          if (!r) throw new NotFoundException();
          return r;
        }),
      );
      await qr.manager.createQueryBuilder().relation(User, 'tagList').of(uid).add(tagList);
      await qr.commitTransaction();
    } catch (e: any) {
      await qr.rollbackTransaction();
      err = e;
    } finally {
      await qr.release();
    }

    if (err) throw err;

    const r = await this.findOneById(uid, { rel: [UserRelations.tagList] });

    return r;
  }

  async removeTasgFromUser(
    user: UserReqDto,
    id: number,
  ): Promise<{ tags: Partial<TagWithCreatorUidDto>[] }> {
    const { uid } = await this.findOneByUsername(user.username);

    await this.connection.createQueryBuilder().relation(User, 'tagList').of(uid).remove(id);

    const userDb = await this.findOneById(uid, {
      rel: [UserRelations.tagList],
    });

    return { tags: userDb.tagList };
  }

  async createProfile(user: Partial<User>): Promise<ResultPayload> {
    // Не разобрался как норм импортнуть, чтобы не получить password_validator_1.default is not a constructor
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const passwordValidator = require('password-validator');
    const schema = new passwordValidator();
    schema.has().uppercase().has().lowercase().has().digits(1).has().not().spaces().is().min(8);

    if (!schema.validate(user.password)) {
      throw new PasswordToWeakError();
    }

    await this.usersRepository.save(user);

    return { result: true };
  }

  async updateProfile(user: UserReqDto, body: Partial<User>): Promise<Partial<User>> {
    const { uid } = await this.findOneByUsername(user.username);

    await this.connection
      .createQueryBuilder()
      .update(User)
      .set(body)
      .where('uid = :uid', { uid })
      .execute();

    const r = this.findOneById(uid);

    return r;
  }

  async removeProfile(user: UserReqDto): Promise<any> {
    const { uid } = await this.findOneByUsername(user.username);

    const userDb = (await this.findOneById(uid)) as User;

    await this.usersRepository.remove(userDb);

    return { result: true };
  }
}
