import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { TagBaseDto } from './TagBaseDto';
import { UserUpdateDto } from './UserBaseDto';

export class TagWithCreatorUidDto extends TagBaseDto {
  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly creatorUid: string;
}

export class TagWithCreatorDto extends TagBaseDto {
  @ApiProperty({ type: UserUpdateDto })
  @ValidateNested()
  @IsObject()
  @Type(() => UserUpdateDto)
  public readonly creator: UserUpdateDto;
}

export class PartialTagDto extends PartialType(TagWithCreatorUidDto) {}
