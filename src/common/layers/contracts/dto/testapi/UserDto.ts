import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { PartialTagDto, TagWnoCreator } from './TagDto';
// import { BaseTagDto } from './BaseTagDto';

export class UserDto {
  @ApiProperty()
  @IsString()
  public readonly uid: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;

  @ApiProperty()
  @IsString()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  public readonly username: string;

  @ApiProperty({ type: [TagWnoCreator] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TagWnoCreator)
  public readonly tags: TagWnoCreator[];
}

export class UserWnoPasswordDto extends OmitType(UserDto, ['password'] as const) {}
export class UserUpdateDto extends OmitType(UserDto, ['password', 'tags'] as const) {}
