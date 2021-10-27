import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TagBaseDto } from './TagBaseDto';
// import { PartialTagDto, TagWnoCreator } from './TagDto';
// import { BaseTagDto } from './BaseTagDto';

export class TagListDto {
  @ApiProperty({ type: [TagBaseDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TagBaseDto)
  public readonly tags: TagBaseDto[];
}
