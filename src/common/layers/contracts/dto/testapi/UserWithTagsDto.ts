// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import { IsArray, ValidateNested } from 'class-validator';
// import { BaseTagDto } from './BaseTagDto';
// import { BaseUserDto } from './BaseUserDto';

// export class UserWithTagsDto extends BaseUserDto {
//   @ApiProperty({ type: [BaseTagDto] })
//   @ValidateNested({ each: true })
//   @IsArray()
//   @Type(() => BaseTagDto)
//   public readonly tags: BaseTagDto[];
// }
