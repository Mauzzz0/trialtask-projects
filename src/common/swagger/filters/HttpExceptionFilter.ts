import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import CodesEnum from 'src/common/rules/exceptions/CodesEnum';
import { ErrorResponse } from '../types/ErrorResponse';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let code = exception['code'] || 'UNTRACKED_APP_ERROR';
    let { message } = exception;

    // Костылёк, непонятно как LocalStrategy кидает свой Unauthorized()
    switch (exception['status']) {
      case 401:
        code = CodesEnum.UNATHORIZED;
        message = 'You must be authorized';
        break;
    }

    const responseObject: ErrorResponse = {
      status: SuccessOrErrorEnum.Error,
      payload: { code, message },
    };
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObject);
  }
}
