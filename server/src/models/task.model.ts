import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @property({
    type: 'string',
  })
  cover?: string;

  @property({
    type: 'string',
    required: true,
  })
  statusId: string;

 

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
