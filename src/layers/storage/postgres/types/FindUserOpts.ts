import { TagRelations } from './TagRelEnum';
import { UserRelations } from './UserRelEnum';

export interface FindOpts {
  rel: Array<UserRelations | TagRelations>;
}
