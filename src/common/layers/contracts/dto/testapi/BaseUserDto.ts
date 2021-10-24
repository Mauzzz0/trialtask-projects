import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BaseUserDto {
  @ApiProperty()
  @IsString()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  public readonly username: string;
}
