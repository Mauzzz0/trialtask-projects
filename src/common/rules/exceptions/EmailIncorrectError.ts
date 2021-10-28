import CodesEnum from './CodesEnum';
import { DefaultError } from './DefaultError';

export class EmailIncorrectError extends DefaultError {
  constructor() {
    super(CodesEnum.EMAIL_INCORRECT, 'Email is not correct');
  }
}
