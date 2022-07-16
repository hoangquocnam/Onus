import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Status} from '../models';
import {StatusRepository, WorkspaceRepository} from '../repositories';
import _ from 'lodash';

export class StatusController {
  constructor(
    @repository(StatusRepository)
    public statusRepository: StatusRepository,
    @repository(WorkspaceRepository)
    public workspaceRepository: WorkspaceRepository,
  ) {}

  //TODO: add status to workspace
  @post('/statuses')
  @response(200, {
    description: 'Status model instance',
    content: {'application/json': {schema: getModelSchemaRef(Status)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    status: Omit<Status, 'id'>,
  ): Promise<Status> {
    let workspace = await this.workspaceRepository.findById(status.workspaceId);
    const newStatus = await this.statusRepository.create(status);
    if (_.isArray(workspace.statusListId)) {
      if (workspace.statusListId.indexOf(newStatus.id) === -1) {
        workspace.statusListId.push(newStatus.id);
      }
    } else {
      workspace.statusListId = [newStatus.id];
    }
    await this.workspaceRepository.updateById(workspace.id, workspace);
    return newStatus;
  }

  //TODO: Get status by id
  @get('/statuses/{id}')
  @response(200, {
    description: 'Status model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Status, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Status, {exclude: 'where'})
    filter?: FilterExcludingWhere<Status>,
  ): Promise<Status> {
    return this.statusRepository.findById(id, filter);
  }

  //TODO: Edit status
  // @patch('/statuses/{id}')
  // @response(204, {
  //   description: 'Status PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Status, {partial: true}),
  //       },
  //     },
  //   })
  //   status: Status,
  // ): Promise<void> {
  //   await this.statusRepository.updateById(id, status);
  // }

  //TODO: Patch method to update all statuses of a workspace
  // @patch('/statuses')
  // @response(200, {
  //   description: 'Status PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Status, {partial: true}),
  //       },
  //     },
  //   })
  //   status: Status,
  //   @param.where(Status) where?: Where<Status>,
  // ): Promise<Count> {
  //   return this.statusRepository.updateAll(status, where);
  // }


  //TODO: PUT method to update all statuses of a workspace
  // @put('/statuses/{id}')
  // @response(204, {
  //   description: 'Status PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() status: Status,
  // ): Promise<void> {
  //   await this.statusRepository.replaceById(id, status);
  // }

  // TODO: Delete status by id
  // @del('/statuses/{id}')
  // @response(204, {
  //   description: 'Status DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.statusRepository.deleteById(id);
  // }
}
