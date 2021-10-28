import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNumber } from 'class-validator';

export class GetTagsPaginationQueryDto {
  @ApiProperty({ description: 'offset', example: 0 })
  @Type(() => Number)
  @IsNumber()
  public readonly offset: number;

  @ApiProperty({ description: 'length [max 100]', example: 10, maximum: 100 }) // 100 макс, чтобы не нагружать
  @Type(() => Number)
  @IsNumber()
  public readonly length: number;

  @ApiProperty({ description: 'sortByOrder', example: 'false' })
  @IsBooleanString()
  public readonly sortByOrder: string;

  @ApiProperty({ description: 'sortByName', example: 'false' })
  @IsBooleanString()
  public readonly sortByName: string;
}
