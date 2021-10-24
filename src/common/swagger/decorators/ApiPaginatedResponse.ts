import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

export const ApiPaginatedResponse = <TModel extends Type<any>>(PayloadType: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `${PayloadType.name}PaginatedResponse`,
        allOf: [
          {
            properties: {
              status: { type: 'string', default: SuccessOrErrorEnum.Ok },
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(PayloadType) },
              },
            },
          },
        ],
      },
    }),
  );
};
