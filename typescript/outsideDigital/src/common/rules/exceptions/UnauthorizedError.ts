import CodesEnum from './CodesEnum';
import { DefaultError } from './DefaultError';

export class UnauthorizedError extends DefaultError {
  constructor() {
    super(CodesEnum.UNATHORIZED, 'You must be authorized');
  }
}
