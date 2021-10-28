import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagBodyDto {
  @ApiProperty({ description: 'name', example: 'tag22', maxLength: 40 })
  @IsString()
  public readonly name: string;

  @ApiProperty({ description: 'sortOrder', example: 1 })
  @IsNumber()
  public readonly sortOrder: number;
}
