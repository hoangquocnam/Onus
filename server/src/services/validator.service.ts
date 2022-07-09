import {HttpErrors} from '@loopback/rest';
import * as isEmail from 'isemail';
import {Credentials} from '../repositories/users.repository';
import {UsersRepository} from '../repositories/users.repository';

export async function validateCredentials(
  credentials: Credentials,
  userRepository: UsersRepository,
) {
  if (!isEmail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('Invalid Email');
  }
  const foundUser = await userRepository.findOne({
    where: {
      email: credentials.email,
    },
  });
  if (foundUser !== null) {
    throw new HttpErrors.UnprocessableEntity('This email already exists');
  }
  if (credentials.email.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'Email length should be greater than 8',
    );
  }
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'Password length should be greater than 8',
    );
  }
}
