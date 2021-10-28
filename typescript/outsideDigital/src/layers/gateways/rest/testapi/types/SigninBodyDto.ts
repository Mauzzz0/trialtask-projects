import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninBodyDto {
  @ApiProperty({ description: 'username', example: 'username' })
  @IsString()
  public readonly username: string;

  @ApiProperty({ description: 'password', example: 'Password1' })
  @IsString()
  public readonly password: string;
}
