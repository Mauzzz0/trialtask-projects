import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from './ApiOkResponse';
import { NoticePayload } from '../schema/NoticePayload';

export const ApiOkNoticeResponse = () => {
  return applyDecorators(ApiOkResponse(NoticePayload));
};
