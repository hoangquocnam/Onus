import {inject} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {PasswordHasherBindings} from '../keys';

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>
}

export class BcryptHasher implements PasswordHasher<string> {
  async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
    const passwordMatches = await compare(providedPass, storedPass);
    return passwordMatches;
  }

  // @inject('rounds')
  @inject(PasswordHasherBindings.ROUNDS)
  public readonly rounds: number

  // round: number = 10;
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    return await hash(password, salt);
  }
}