import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OnusDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.Onus') dataSource: OnusDataSource,
  ) {
    super(Users, dataSource);
  }
}
