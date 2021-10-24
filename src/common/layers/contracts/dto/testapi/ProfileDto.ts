import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  public readonly uid: string;

  @ApiProperty()
  @IsString()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;
}
