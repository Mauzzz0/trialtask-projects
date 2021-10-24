import { ClickhouseConnection, MysqlConnection } from '../types/ConnectionSettings';

export class DatabaseConfig {
  static zabbix: MysqlConnection = {
    client: 'mysql',
    host: 'MYSQL_ZABBIX_HOST',
    port: 0,
    user: 'MYSQL_ZABBIX_USER',
    password: 'MYSQL_ZABBIX_PASSWORD',
    database: 'MYSQL_ZABBIX_DB_NAME',
  };

  static billing: MysqlConnection = {
    client: 'mysql',
    host: 'MYSQL_WHMCS_HOST',
    port: 0,
    user: 'MYSQL_WHMCS_USER',
    password: 'MYSQL_WHMCS_PASSWORD',
    database: 'MYSQL_WHMCS_DB_NAME',
  };

  static msvc: MysqlConnection = {
    client: 'mysql',
    host: 'MYSQL_MSVC_HOST',
    port: 0,
    user: 'MYSQL_MSVC_USER',
    password: 'MYSQL_MSVC_PASSWORD',
    database: 'MYSQL_MSVC_DB_NAME',
  };

  static clickhouseMSK: ClickhouseConnection = {
    client: 'clickhouse',
    url: 'CLICKHOUSE_MSK_URL',
    port: 8123,
    format: 'json',
    basicAuth: {
      username: 'CLICKHOUSE_MSK_USER',
      password: 'CLICKHOUSE_MSK_PASSWORD',
    },
    database: 'CLICKHOUSE_MSK_DB',
  };

  static clickhouseFNM: ClickhouseConnection = {
    client: 'clickhouse',
    url: 'CLICKHOUSE_FNM_URL',
    port: 8123,
    format: 'json',
    basicAuth: {
      username: 'CLICKHOUSE_FNM_USER',
      password: 'CLICKHOUSE_FNM_PASSWORD',
    },
    database: 'CLICKHOUSE_FNM_DB',
  };

  static clickhouseFRA: ClickhouseConnection = {
    client: 'clickhouse',
    url: 'CLICKHOUSE_FRA_URL',
    port: 8123,
    format: 'json',
    basicAuth: {
      username: 'CLICKHOUSE_FRA_USER',
      password: 'CLICKHOUSE_FRA_PASSWORD',
    },
    database: 'CLICKHOUSE_FRA_DB',
  };
}

export default DatabaseConfig;
