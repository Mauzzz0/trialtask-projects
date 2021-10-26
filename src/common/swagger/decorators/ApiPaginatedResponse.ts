import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        title: `${model.name}PaginatedResponse`,
        oneOf: [
          {
            properties: {
              trackingId: { type: 'string' },
              status: { type: 'string', default: SuccessOrErrorEnum.Ok },
              payload: {
                allOf: [
                  {
                    properties: {
                      total: {
                        type: 'number',
                      },
                      limit: {
                        type: 'number',
                      },
                      offset: {
                        type: 'number',
                      },
                      results: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
    HttpCode(HttpStatus.OK),
  );
};
