import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PartialTagDto, TagWnoCreator } from './TagDto';
// import { BaseTagDto } from './BaseTagDto';

export class TagListDto {
  @ApiProperty({ type: [TagWnoCreator] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TagWnoCreator)
  public readonly tags: TagWnoCreator[];
}
