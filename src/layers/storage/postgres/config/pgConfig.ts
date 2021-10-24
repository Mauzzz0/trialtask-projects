import { PgProviderParamsInterface } from 'src/common/db/postgres/types/PgProviderParamsInterface';

export const pgConfig = (): PgProviderParamsInterface => ({
  option: null,
  params: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
  },
});
