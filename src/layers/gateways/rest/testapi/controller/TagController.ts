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
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultPayload } from 'src/common/layers/contracts/dto/testapi/ResultPayload';
import { TagBaseDto } from 'src/common/layers/contracts/dto/testapi/TagBaseDto';
import {
  TagWithCreatorUidDto,
  TagWithCreatorDto,
} from 'src/common/layers/contracts/dto/testapi/TagDto';
import { UserReqDto } from 'src/common/layers/contracts/dto/testapi/UserReqDto';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiErrorResponse } from 'src/common/swagger/decorators/ApiErrorResponse';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { ApiPaginatedResponse } from 'src/common/swagger/decorators/ApiPaginatedResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { NoticePayload } from 'src/common/swagger/schema/NoticePayload';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { TagsService } from 'src/layers/domains/testapi/services/TagsService';
import { CreateTagBodyDto } from '../types/CreateTagBodyDto';
import { GetTagsPaginationQueryDto } from '../types/GetTagsPaginationQueryDto';
import { UpdateTagBodyDto } from '../types/UpdateTagBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(
  CreateTagBodyDto,
  UpdateTagBodyDto,
  TagWithCreatorUidDto,
  TagWithCreatorDto,
  TagBaseDto,
  NoticePayload,
)
@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ description: 'Создание нового тэга' })
  @ApiOkResponse(ResultPayload)
  @ApiErrorResponse()
  @Post('')
  public async create(@User() user: UserReqDto, @Body() body: CreateTagBodyDto): Promise<any> {
    return this.tagsService.createOne(user, body);
  }

  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Список тэгов' })
  @ApiPaginatedResponse(TagWithCreatorDto)
  @ApiErrorResponse()
  @Get('')
  public async list(@Query() q: GetTagsPaginationQueryDto): Promise<any> {
    return this.tagsService.findPagination(q);
  }

  @ApiOperation({ description: 'Информация по тэгу' })
  @ApiOkResponse(TagWithCreatorDto)
  @ApiErrorResponse()
  @Get(':id')
  public async index(@Param('id') id: number): Promise<any> {
    return this.tagsService.showTag(id);
  }

  @ApiOperation({ description: 'Обновление тэга. Только создатель.' })
  @ApiOkResponse(TagBaseDto)
  @ApiErrorResponse()
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
  @ApiErrorResponse()
  @Delete(':id')
  public async destroy(@User() user: UserReqDto, @Param('id') id: number): Promise<any> {
    return this.tagsService.delete(user, id);
  }
}
