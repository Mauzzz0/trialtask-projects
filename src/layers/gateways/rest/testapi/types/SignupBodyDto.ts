import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupBodyDto {
  @ApiProperty({ description: 'email', example: 'email@domain.com', maxLength: 100 })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ description: 'username', example: 'username', maxLength: 30 })
  @IsString()
  public readonly username: string;

  @ApiProperty({ description: 'password', example: 'Password1', maxLength: 100 })
  @IsString()
  public readonly password: string;
}
