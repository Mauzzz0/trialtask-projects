// export interface ConnectionSettings {
//   clickhouseMSK: ClickhouseConnection
//   clickhouseFRA: ClickhouseConnection
//   clickhouseFNM: ClickhouseConnection
//   zabbix: MysqlConnection
//   msvc: MysqlConnection
//   billing: MysqlConnection
// }

export interface ClickhouseConnection {
  client: 'clickhouse';
  url: string;
  port: number;
  format: string;
  basicAuth: {
    username: string;
    password: string;
  };
  database: string;
}

export interface MysqlConnection {
  client: 'mysql';
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
