import { ApiProperty } from '@nestjs/swagger';

export class NoticePayload {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: string;
}
