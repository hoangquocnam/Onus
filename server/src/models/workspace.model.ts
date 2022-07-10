import {Entity, model, property} from '@loopback/repository';
import { User } from './user.model';
import {belongsTo, hasMany} from '@loopback/repository';

@model({settings: {strict: true}})
export class Workspace extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => User, {name: 'user'})
  ownerId: string;




  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Workspace>) {
    super(data);
  }
}

export interface WorkspaceRelations {
  // describe navigational properties here
}

export type WorkspaceWithRelations = Workspace & WorkspaceRelations;
