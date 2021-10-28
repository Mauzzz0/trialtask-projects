import CodesEnum from './CodesEnum';
import { DefaultError } from './DefaultError';

export class PasswordToWeakError extends DefaultError {
  constructor() {
    super(
      CodesEnum.PASSWORD_TO_WEAK,
      'Password is to weak. Must be at least 1 upper, 1 lower, 1 digit and length 8',
    );
  }
}
