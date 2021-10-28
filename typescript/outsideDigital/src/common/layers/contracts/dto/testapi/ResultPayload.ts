import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ResultPayload {
  @ApiProperty()
  @IsBoolean()
  public readonly result: boolean;
}
