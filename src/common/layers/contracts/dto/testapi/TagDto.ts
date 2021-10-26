import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { UserWnoPasswordDto } from './UserDto';

export class TagDto {
  @ApiProperty()
  @ValidateNested()
  @IsNumber()
  public readonly id: number;

  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly name: string;

  @ApiProperty()
  @ValidateNested()
  @IsNumber()
  public readonly sortOrder: number;

  @ApiProperty()
  @ValidateNested()
  @IsString()
  public readonly creatorUid: string;
}

export class PartialTagDto extends PartialType(TagDto) {}
export class TagWnoCreator extends OmitType(TagDto, ['creatorUid'] as const) {}

export class Creator {
  @ApiProperty({ type: [PartialTagDto] })
  @ValidateNested()
  @IsObject()
  @Type(() => UserWnoPasswordDto)
  public readonly creator: UserWnoPasswordDto;
}

export class TagWithCreatorDto extends IntersectionType(TagDto, Creator) {}
