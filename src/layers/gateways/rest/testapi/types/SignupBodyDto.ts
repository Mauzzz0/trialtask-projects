import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupBodyDto {
  @ApiProperty({ description: 'email', example: 'e@e.e' })
  @IsString()
  public readonly email: string;

  @ApiProperty({ description: 'username', example: 'username' })
  @IsString()
  public readonly username: string;

  @ApiProperty({ description: 'password', example: 'password' })
  @IsString()
  public readonly password: string;
}
