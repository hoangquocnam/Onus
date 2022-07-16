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
import {Task} from '../models';
import {
  TaskRepository,
  UserRepository,
  StatusRepository,
} from '../repositories';
import _ from 'lodash';

export class TaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,

    @repository(UserRepository)
    public userRepository: UserRepository,

    @repository(StatusRepository)
    public statusRepository: StatusRepository,
  ) {}


  // TODO: Create a new task
  @post('/tasks')
  @response(200, {
    description: 'Task model instance',
    content: {'application/json': {schema: getModelSchemaRef(Task)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTask',
            exclude: ['id'],
          }),
        },
      },
    })
    task: Omit<Task, 'id'>,
  ): Promise<Task> {
    const newTask = await this.taskRepository.create(task);
    let status = await this.statusRepository.findById(task.statusId);
    if (_.isArray(status.taskIdList)) {
      if (status.taskIdList.indexOf(newTask.id) === -1) {
        status.taskIdList.push(newTask.id);
      }
    }
    else {
      status.taskIdList = [newTask.id];
    }
    await this.statusRepository.updateById(status.id, status);
    return newTask;
  }

  //TODO: GET all tasks
  @get('/tasks')
  @response(200, {
    description: 'Array of Task model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Task, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Task) filter?: Filter<Task>): Promise<Task[]> {
    return this.taskRepository.find(filter);
  }

  //TODO: Patch method for tasks
  // @patch('/tasks')
  // @response(200, {
  //   description: 'Task PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Task, {partial: true}),
  //       },
  //     },
  //   })
  //   task: Task,
  //   @param.where(Task) where?: Where<Task>,
  // ): Promise<Count> {
  //   return this.taskRepository.updateAll(task, where);
  // }

  //TODO: GET task by id
  // @get('/tasks/{id}')
  // @response(200, {
  //   description: 'Task model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Task, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(Task, {exclude: 'where'}) filter?: FilterExcludingWhere<Task>,
  // ): Promise<Task> {
  //   return this.taskRepository.findById(id, filter);
  // }

  //TODO: PATCH a task id
  // @patch('/tasks/{id}')
  // @response(204, {
  //   description: 'Task PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Task, {partial: true}),
  //       },
  //     },
  //   })
  //   task: Task,
  // ): Promise<void> {
  //   await this.taskRepository.updateById(id, task);
  // }

  //TODO: PUT task by id 
  // @put('/tasks/{id}')
  // @response(204, {
  //   description: 'Task PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() task: Task,
  // ): Promise<void> {
  //   await this.taskRepository.replaceById(id, task);
  // }


  //TODO: delete task
  // @del('/tasks/{id}')
  // @response(204, {
  //   description: 'Task DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.taskRepository.deleteById(id);
  // }
}
