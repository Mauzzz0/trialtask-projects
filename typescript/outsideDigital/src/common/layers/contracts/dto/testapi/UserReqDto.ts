import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserReqDto {
  @ApiProperty()
  @IsString()
  public readonly username: string;
}
