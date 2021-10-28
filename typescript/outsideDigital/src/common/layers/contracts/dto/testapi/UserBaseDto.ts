import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { TagBaseDto } from './TagBaseDto';

export class UserBaseDto {
  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly uid: string;

  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly email: string;

  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly username: string;

  @ApiProperty({ type: [TagBaseDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TagBaseDto)
  public readonly tagList: TagBaseDto[];
}

export class UserUpdateDto extends OmitType(UserBaseDto, ['tagList'] as const) {}
