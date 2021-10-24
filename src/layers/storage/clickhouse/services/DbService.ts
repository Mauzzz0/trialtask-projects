import { Injectable } from '@nestjs/common';
import { ClickHouse } from 'clickhouse';
import DatabaseConfig from '../config/DatabaseConfig';

@Injectable()
export class DbService {
  //todo: сервисы = синглтоны при пробрасывании в разные части?
  static storage: { [key: string]: ClickHouse } = {};

  public async connection(connection: CH): Promise<ClickHouse> {
    if (DbService.storage[connection] === undefined) {
      DbService.storage[connection] = new ClickHouse(DatabaseConfig[connection]);
    }
    return DbService.storage[connection];
  }
}

export enum CH {
  MSK = 'clickhouseMSK',
  FNM = 'clickhouseFNM',
  FRA = 'clickhouseFRA',
}
