import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseUserDto } from './BaseUserDto';

export class UserWithUidAndPasswordDto extends BaseUserDto {
  @ApiProperty()
  @IsString()
  public readonly uid: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;
}
