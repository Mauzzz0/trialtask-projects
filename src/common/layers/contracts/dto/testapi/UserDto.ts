import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { TagBaseDto } from './TagBaseDto';
import { UserBaseDto } from './UserBaseDto';
// import { BaseTagDto } from './BaseTagDto';

export class UserDto extends UserBaseDto {
  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly password: string;
}

export class UserWnoPasswordDto extends OmitType(UserDto, ['password'] as const) {}
