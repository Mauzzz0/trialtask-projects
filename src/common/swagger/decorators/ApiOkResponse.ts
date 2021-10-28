import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse } from './ApiResponse';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

export const ApiOkResponse = <TModel extends Type<any>>(PayloadType: TModel) => {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiResponse(HttpStatus.OK, SuccessOrErrorEnum.Ok, PayloadType),
  );
};
