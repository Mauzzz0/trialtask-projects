import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from './ApiResponse';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';
import { NoticePayload } from '../schema/NoticePayload';

export const ApiErrorResponse = () => {
  return applyDecorators(
    ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, SuccessOrErrorEnum.Error, NoticePayload),
  );
};
