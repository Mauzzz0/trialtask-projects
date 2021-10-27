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

export class PartialTagDto extends PartialType(TagWithCreatorUidDto) {}
// export class TagWnoCreator extends OmitType(TagDto, ['creatorUid'] as const) {}

export class TagWithCreatorDto extends TagBaseDto {
  @ApiProperty({ type: UserUpdateDto })
  @ValidateNested()
  @IsObject()
  @Type(() => UserUpdateDto)
  public readonly creator: UserUpdateDto;
}

// export class TagWithCreatorDto extends IntersectionType(TagWnoCreator, Creator) {}
