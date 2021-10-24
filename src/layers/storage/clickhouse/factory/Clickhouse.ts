/*
import { ClickHouse } from 'clickhouse'
import { DatabaseConfig } from '../config/DatabaseConfig'

export class Clickhouse {
  static storage: { [key: string]: ClickHouse } = {}

  public static connection(connection: CH): ClickHouse {
    if (this.storage[connection] === undefined) {
      this.storage[connection] = new ClickHouse(DatabaseConfig[connection])
    }
    return this.storage[connection]
  }
}

export enum CH {
  MSK = 'clickhouseMSK',
  FNM = 'clickhouseFNM',
  FRA = 'clickhouseFRA',
}
*/
