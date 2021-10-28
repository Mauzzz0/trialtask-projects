import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class AddTagToUserBodyDto {
  @ApiProperty({ type: 'array', description: 'tags', example: [1, 2] })
  @IsArray()
  public readonly tags: number[];
}
