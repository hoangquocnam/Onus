import {Entity, model, property} from '@loopback/repository';
import {User} from './user.model';
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
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  statusListId: string[];
  

  constructor(data?: Partial<Workspace>) {
    super(data);
  }
}

export interface WorkspaceRelations {
  // describe navigational properties here
}

export type WorkspaceWithRelations = Workspace & WorkspaceRelations;
