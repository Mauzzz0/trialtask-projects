import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse } from './ApiResponse';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';
import { NoticePayload } from '../schema/NoticePayload';

export const ApiErrorResponse = <TModel extends Type<any>>() => {
  return applyDecorators(
    ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, SuccessOrErrorEnum.Error, NoticePayload),
  );
};
