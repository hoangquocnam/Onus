import {
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  get,
  getJsonSchemaRef,
  post,
  param,
  getModelSchemaRef,
  requestBody,
  response,
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {Users} from '../models';
import {
  Credentials,
  UsersRepository,
} from '../repositories';
import {validateCredentials} from '../services';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {authRoutes} from './routes.helper';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services/basic.authorizor';
import {CredentialsRequestBody} from '../types/credential-schema';
import axios from 'axios';
import {resolve} from 'dns';

export class AuthController {
  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @post(authRoutes.signup, {
    responses: {
      '200': {
        description: 'Sign up a new user',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    userData: Omit<Users, 'id'>,
  ) {
    await validateCredentials(
      _.pick(userData, ['email', 'password']),
      this.userRepository,
    );
    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);
    return _.omit(savedUser, 'password');
  }

  @post(authRoutes.login, {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = await this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token});
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['user'], voters: [basicAuthorization]})
  @get(authRoutes.getMe, {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(Users),
          },
        },
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.userRepository.findById(currentUser.id);
    return _.omit(user, 'password');
  }
}
