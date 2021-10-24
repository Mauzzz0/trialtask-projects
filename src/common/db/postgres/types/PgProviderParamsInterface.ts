import { IInitOptions } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

export interface PgProviderParamsInterface {
  option: IInitOptions;
  params: IConnectionParameters;
}
