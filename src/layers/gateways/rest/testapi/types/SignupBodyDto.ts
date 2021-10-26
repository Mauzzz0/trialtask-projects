import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupBodyDto {
  @ApiProperty({ description: 'email', example: 'email@domain.com' })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ description: 'username', example: 'username' })
  @IsString()
  public readonly username: string;

  @ApiProperty({ description: 'password', example: 'Password1' })
  @IsString()
  public readonly password: string;
}
