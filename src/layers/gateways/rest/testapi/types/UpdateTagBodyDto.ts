import { PartialType } from '@nestjs/swagger';
import { CreateTagBodyDto } from './CreateTagBodyDto';

export class UpdateTagBodyDto extends PartialType(CreateTagBodyDto) {}
