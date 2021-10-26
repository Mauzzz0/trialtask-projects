// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import { IsArray, IsString, ValidateNested } from 'class-validator';
// import { PartialTagDto } from './TagDto';
// // import { BaseTagDto } from './BaseTagDto';

// export class UserWithoutPasswordDto {
//   @ApiProperty()
//   @IsString()
//   public readonly uid: string;

//   @ApiProperty()
//   @IsString()
//   public readonly email: string;

//   @ApiProperty()
//   @IsString()
//   public readonly username: string;

//   @ApiProperty({ type: [PartialTagDto] })
//   @ValidateNested({ each: true })
//   @IsArray()
//   @Type(() => PartialTagDto)
//   public readonly tags: PartialTagDto[];
// }
