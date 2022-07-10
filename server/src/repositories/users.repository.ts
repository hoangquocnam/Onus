import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OnusDataSource} from '../datasources';
import {User, UserRelations} from '../models';


export type Credentials = {
  email: string;
  password: string;
}

export class UsersRepository extends DefaultCrudRepository<
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
