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
import {Workspace} from '../models';
import {UserRepository, WorkspaceRepository} from '../repositories';
import _ from 'lodash';

export class WorkspaceController {
  constructor(
    @repository(WorkspaceRepository)
    public workspaceRepository: WorkspaceRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  //TODO: Create a new workspace for the user
  @post('/workspaces')
  @response(200, {
    description: 'Workspace model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workspace)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workspace, {
            title: 'NewWorkspace',
            exclude: ['id'],
          }),
        },
      },
    })
    workspace: Omit<Workspace, 'id'>,
  ): Promise<Workspace> {
    let user = await this.userRepository.findById(workspace.ownerId);
    const newWorkspace = await this.workspaceRepository.create(workspace);
    if (_.isArray(user.workspaceIdList)) {
      if (user.workspaceIdList.indexOf(newWorkspace.id) === -1) {
        user.workspaceIdList.push(newWorkspace.id);
      }
    } else {
      user.workspaceIdList = [newWorkspace.id];
    }
    await this.userRepository.updateById(user.id, user);
    return newWorkspace;
  }

  //TODO: Get all workspaces for a user
  @get('/workspaces')
  @response(200, {
    description: 'Array of Workspace model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workspace, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workspace) filter?: Filter<Workspace>,
  ): Promise<Workspace[]> {
    return this.workspaceRepository.find(filter);
  }

  //TODO: GET a workspace by id
  @get('/workspaces/{id}')
  @response(200, {
    description: 'Workspace model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workspace, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Workspace, {exclude: 'where'})
    filter?: FilterExcludingWhere<Workspace>,
  ): Promise<Workspace> {
    return this.workspaceRepository.findById(id, filter);
  }

  //TODO: Get all workspaces for a user
  @get('/users/{id}/workspaces')
  @response(200, {
    description: 'Array of Workspace model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workspace, {includeRelations: true}),
        },
      },
    },
  })
  async findWorkspacesByUserId(
    @param.path.string('id') id: string,
  ): Promise<Workspace[]> {
    let user = await this.userRepository.findById(id);
    let workspaceIdList = user.workspaceIdList;
    let workspaceList = [];
    for (let i = 0; i < workspaceIdList.length; i++) {
      let workspace = await this.workspaceRepository.findById(
        workspaceIdList[i],
      );
      workspaceList.push(workspace);
    }
    return workspaceList;
  }

  //TODO: PATCH method all
  // @patch('/workspaces')
  // @response(200, {
  //   description: 'Workspace PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Workspace, {partial: true}),
  //       },
  //     },
  //   })
  //   workspace: Workspace,
  //   @param.where(Workspace) where?: Where<Workspace>,
  // ): Promise<Count> {
  //   return this.workspaceRepository.updateAll(workspace, where);
  // }

  //TODO: PATCH method by id
  // @patch('/workspaces/{id}')
  // @response(204, {
  //   description: 'Workspace PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Workspace, {partial: true}),
  //       },
  //     },
  //   })
  //   workspace: Workspace,
  // ): Promise<void> {
  //   await this.workspaceRepository.updateById(id, workspace);
  // }

  //TODO: PUT method by id
  // @put('/workspaces/{id}')
  // @response(204, {
  //   description: 'Workspace PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() workspace: Workspace,
  // ): Promise<void> {
  //   await this.workspaceRepository.replaceById(id, workspace);
  // }

  //TODO: Delete method by id
  // @del('/workspaces/{id}')
  // @response(204, {
  //   description: 'Workspace DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.workspaceRepository.deleteById(id);
  // }
}
