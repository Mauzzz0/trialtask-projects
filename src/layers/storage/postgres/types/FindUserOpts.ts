import { UserRelations } from './UserRelEnum';

export interface FindUserOpts {
  rel: Array<UserRelations>;
}
