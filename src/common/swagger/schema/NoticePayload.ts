import { ApiProperty } from '@nestjs/swagger';
import { SuccessOrErrorEnum } from '../types/SuccessOrErrorEnum';

export class NoticePayload {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: string;
}
