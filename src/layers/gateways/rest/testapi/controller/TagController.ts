import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiPaginatedResponse } from 'src/common/swagger/decorators/ApiPaginatedResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { TagsService } from 'src/layers/domains/testapi/services/TagsService';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { CreateTagBodyDto } from '../types/CreateTagBodyDto';
import { GetTagsPaginationQueryDto } from '../types/GetTagsPaginationQueryDto';
import { UpdateTagBodyDto } from '../types/UpdateTagBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(CreateTagBodyDto, UpdateTagBodyDto, Tag)
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

  @ApiOperation({ description: 'Список тэгов' })
  @Get('')
  public async list(@Query() q: GetTagsPaginationQueryDto): Promise<any> {
    console.log(q);
    return this.tagsService.findPagination(q);
  }

  @ApiOperation({ description: 'Информация по тэгу' })
  @Get(':id')
  public async index(@Param('id') id: number): Promise<any> {
    return this.tagsService.showTag(id);
  }

  @ApiOperation({ description: 'Обновление тэга. Только создатель.' })
  @Put(':id')
  public async update(
    @User() user: any,
    @Param('id') id: number,
    @Body() body: UpdateTagBodyDto,
  ): Promise<any> {
    return this.tagsService.update(user, id, body);
  }

  @ApiOperation({ description: 'Удаление тэга. Только создатель.' })
  @Delete(':id')
  public async destroy(@User() user: any, @Param('id') id: number): Promise<any> {
    return this.tagsService.delete(user, id);
  }
}
