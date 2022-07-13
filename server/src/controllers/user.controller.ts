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
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public usersRepository: UserRepository,
  ) {}

  //TODO: GET all users
  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.usersRepository.find(filter);
  }

  //TODO: GET user by id
  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'})
    filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.usersRepository.findById(id, filter);
  }

  //TODO: PATCH method all users
  // @patch('/users')
  // @response(200, {
  //   description: 'Users PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(User, {partial: true}),
  //       },
  //     },
  //   })
  //   users: User,
  //   @param.where(User) where?: Where<User>,
  // ): Promise<Count> {
  //   return this.usersRepository.updateAll(users, where);
  // }


//TODO: PATCH method by id
  // @patch('/users/{id}')
  // @response(204, {
  //   description: 'Users PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(User, {partial: true}),
  //       },
  //     },
  //   })
  //   users: User,
  // ): Promise<void> {
  //   await this.usersRepository.updateById(id, users);
  // }

  //TODO: PUT method by id
  // @put('/users/{id}')
  // @response(204, {
  //   description: 'Users PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() users: User,
  // ): Promise<void> {
  //   await this.usersRepository.replaceById(id, users);
  // }

  //TODO: DELETE method by id
  // @del('/users/{id}')
  // @response(204, {
  //   description: 'Users DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.usersRepository.deleteById(id);
  // }
}
