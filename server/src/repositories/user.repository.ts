import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {OnusDataSource} from '../datasources';
import {Workspace, User, UserRelations} from '../models';
import {WorkspaceRepository} from './workspace.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.Onus') dataSource: OnusDataSource,
  ) {
    super(User, dataSource);
  }
}
