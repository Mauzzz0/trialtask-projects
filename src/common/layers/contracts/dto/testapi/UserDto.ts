import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { PartialTagDto } from './TagDto';
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

  @ApiProperty({ type: [PartialTagDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PartialTagDto)
  public readonly tags: PartialTagDto[];
}

export class UserWnoPasswordDto extends OmitType(UserDto, ['password'] as const) {}
export class UserUpdateDto extends OmitType(UserDto, ['password', 'tags'] as const) {}
