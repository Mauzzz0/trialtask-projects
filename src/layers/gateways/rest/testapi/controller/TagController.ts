import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultPayload } from 'src/common/layers/contracts/dto/testapi/ResultPayload';
import {
  TagDto,
  TagWithCreatorDto,
  TagWnoCreator,
} from 'src/common/layers/contracts/dto/testapi/TagDto';
import { UserReqDto } from 'src/common/layers/contracts/dto/testapi/UserReqDto';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { TagsService } from 'src/layers/domains/testapi/services/TagsService';
import { CreateTagBodyDto } from '../types/CreateTagBodyDto';
import { GetTagsPaginationQueryDto } from '../types/GetTagsPaginationQueryDto';
import { UpdateTagBodyDto } from '../types/UpdateTagBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(CreateTagBodyDto, UpdateTagBodyDto, TagDto, TagWithCreatorDto, TagWnoCreator)
@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ description: 'Создание нового тэга' })
  @ApiOkResponse(ResultPayload)
  @Post('')
  public async create(@User() user: UserReqDto, @Body() body: CreateTagBodyDto): Promise<any> {
    return this.tagsService.createOne(user, body);
  }

  @ApiOperation({ description: 'Список тэгов' })
  @Get('')
  public async list(@Query() q: GetTagsPaginationQueryDto): Promise<any> {
    return this.tagsService.findPagination(q);
  }

  @ApiOperation({ description: 'Информация по тэгу' })
  @ApiOkResponse(TagWithCreatorDto)
  @Get(':id')
  public async index(@Param('id') id: number): Promise<any> {
    return this.tagsService.showTag(id);
  }

  @ApiOperation({ description: 'Обновление тэга. Только создатель.' })
  @ApiOkResponse(TagWnoCreator)
  @Put(':id')
  public async update(
    @User() user: UserReqDto,
    @Param('id') id: number,
    @Body() body: UpdateTagBodyDto,
  ): Promise<any> {
    return this.tagsService.update(user, id, body);
  }

  @ApiOperation({ description: 'Удаление тэга. Только создатель.' })
  @ApiOkResponse(ResultPayload)
  @Delete(':id')
  public async destroy(@User() user: UserReqDto, @Param('id') id: number): Promise<any> {
    return this.tagsService.delete(user, id);
  }
}
