import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OnusDataSource} from '../datasources';
import {Workspace, WorkspaceRelations} from '../models';

export class WorkspaceRepository extends DefaultCrudRepository<
  Workspace,
  typeof Workspace.prototype.id,
  WorkspaceRelations
> {
  constructor(
    @inject('datasources.Onus') dataSource: OnusDataSource,
  ) {
    super(Workspace, dataSource);
  }
}
