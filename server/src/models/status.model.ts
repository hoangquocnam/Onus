import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Status extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;


  @property({
    type: 'string',
    required: true,
  })
  workspaceId: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  taskIdList: string[];

  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
