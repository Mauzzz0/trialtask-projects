import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PartialTagDto } from './TagDto';
// import { BaseTagDto } from './BaseTagDto';

export class TagListDto {
  @ApiProperty({ type: [PartialTagDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PartialTagDto)
  public readonly tags: PartialTagDto[];
}
