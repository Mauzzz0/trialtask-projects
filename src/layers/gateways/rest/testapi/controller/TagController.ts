import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ description: 'Создание нового тэга' })
  @Post('')
  public async create(@User() user: any, @Body() body: CreateTagBodyDto): Promise<any> {
    return this.tagsService.createOne(user, body);
  }

  @ApiOperation({ description: 'Информация по тэгу' })
  @Get(':id')
  public async index(@Param('id') id: number): Promise<any> {
    return this.tagsService.showTag({ id });
    throw new NotImplementedException();
  }

  @ApiOperation({ description: 'Обновление тэга. Только создатель.' })
  @Put(':id')
  public async update(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @ApiOperation({ description: 'Удаление тэга. Только создатель.' })
  @Delete(':id')
  public async destroy(@User() user: any, @Param('id') id: number): Promise<any> {
    return this.tagsService.delete(user, { id });
    throw new NotImplementedException();
  }
}
