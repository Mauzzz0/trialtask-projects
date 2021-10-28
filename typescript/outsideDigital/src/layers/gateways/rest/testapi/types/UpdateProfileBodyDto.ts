import { PartialType } from '@nestjs/swagger';
import { SignupBodyDto } from './SignupBodyDto';

export class UpdateProfileBodyDto extends PartialType(SignupBodyDto) {}
