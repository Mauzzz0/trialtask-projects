import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninBodyDto {
  @ApiProperty({ description: 'username', example: 'username' })
  @IsString()
  public readonly username: string;

  @ApiProperty({ description: 'password', example: 'password' })
  @IsString()
  public readonly password: string;
}
