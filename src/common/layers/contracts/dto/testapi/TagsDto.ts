import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { BaseTagDto } from './BaseTagDto';

export class TagsDto {
  @ApiProperty({ type: [BaseTagDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => BaseTagDto)
  public readonly tags: BaseTagDto[];
}
