import CodesEnum from './CodesEnum';
import { DefaultError } from './DefaultError';

export class EmailIncorrect extends DefaultError {
  constructor() {
    super(CodesEnum.EMAIL_INCORRECT, 'Email is not correct');
  }
}
