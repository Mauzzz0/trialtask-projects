import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { UserBaseDto } from './UserBaseDto';

export class UserDto extends UserBaseDto {
  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly password: string;
}

export class UserWnoPasswordDto extends OmitType(UserDto, ['password'] as const) {}
