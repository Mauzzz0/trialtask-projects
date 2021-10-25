import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { TagsService } from 'src/layers/domains/testapi/services/TagsService';
import { CreateTagBodyDto } from '../types/CreateTagBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(CreateTagBodyDto)
@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagsService: TagsService) {}

  @Post('')
  public async create(@User() user: any, @Body() body: CreateTagBodyDto): Promise<any> {
    return this.tagsService.createOne(user, body);
  }

  @Get('/:id')
  public async index(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @Put('/:id')
  public async update(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async destroy(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }
}
