import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNumber } from 'class-validator';

export class SignInPayload {
  @ApiProperty()
  @IsJWT()
  public readonly token: string;

  @ApiProperty()
  @IsNumber()
  public readonly expire: number;
}
