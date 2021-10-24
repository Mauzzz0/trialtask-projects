import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse as BaseApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

export const ApiResponse = <TModel extends Type<any>>(
  httpStatus: HttpStatus,
  status: SuccessOrErrorEnum,
  PayloadType: TModel,
) => {
  return applyDecorators(
    BaseApiResponse({
      status: httpStatus,
      schema: {
        title: `${PayloadType.name}Response`,
        oneOf: [
          {
            properties: {
              trackingId: { type: 'string' },
              status: { type: 'string', default: status },
              payload: {
                $ref: getSchemaPath(PayloadType),
              },
            },
          },
        ],
      },
    }),
  );
};
