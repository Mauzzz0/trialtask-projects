import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class TagBaseDto {
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
}
