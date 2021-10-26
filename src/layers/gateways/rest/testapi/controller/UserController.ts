import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultPayload } from 'src/common/layers/contracts/dto/testapi/ResultPayload';
import { TagDto, TagWnoCreator } from 'src/common/layers/contracts/dto/testapi/TagDto';
import { TagListDto } from 'src/common/layers/contracts/dto/testapi/TagListDto';
import {
  UserDto,
  UserUpdateDto,
  UserWnoPasswordDto,
} from 'src/common/layers/contracts/dto/testapi/UserDto';
import { UserReqDto } from 'src/common/layers/contracts/dto/testapi/UserReqDto';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';
import { UserRelations } from 'src/layers/storage/postgres/types/UserRelEnum';
import { AddTagToUserBodyDto } from '../types/AddTagToUserBodyDto';
import { UpdateProfileBodyDto } from '../types/UpdateProfileBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(
  TagListDto,
  UserDto,
  TagDto,
  UserWnoPasswordDto,
  TagWnoCreator,
  UserUpdateDto,
  ResultPayload,
  TagWnoCreator,
)
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ description: 'Профиль со всеми тэгами' })
  @ApiOkResponse(UserDto)
  @Get('')
  public async show(@User() user: UserReqDto): Promise<any> {
    return this.userService.findOneByFilter(
      { username: user.username },
      { rel: [UserRelations.tagList] },
    );
  }

  @ApiOperation({ description: 'Обновление профиля' })
  @ApiOkResponse(UserUpdateDto)
  @Put('')
  public async update(@User() user: UserReqDto, @Body() body: UpdateProfileBodyDto): Promise<any> {
    return this.userService.updateProfile(user, body);
  }

  @ApiOperation({ description: 'Удаление профиля' })
  @ApiOkResponse(ResultPayload)
  @Delete('')
  public async destroy(@User() user: UserReqDto): Promise<any> {
    return this.userService.removeProfile(user);
  }

  @ApiOperation({ description: 'Добавление тэга себе в тэг-лист' })
  @ApiOkResponse(UserWnoPasswordDto)
  @Post('/tag')
  public async createTag(
    @User() user: UserReqDto,
    @Body() body: AddTagToUserBodyDto,
  ): Promise<any> {
    return this.userService.addTasgToUser(user, body.tags);
  }

  @ApiOperation({ description: 'Удаление тэга из своего тэг-листа' })
  @ApiOkResponse(TagListDto)
  @Delete('/tag/:id')
  public async destroyTag(@User() user: UserReqDto, @Param('id') id: number): Promise<any> {
    return await this.userService.removeTasgFromUser(user, id);
  }

  @ApiOperation({ description: 'Тэги, которые я создал' })
  @ApiOkResponse(TagListDto)
  @Get('/tag/my')
  public async showTags(@User() user: UserReqDto): Promise<any> {
    const r = await this.userService.findOneByFilter(
      { username: user.username },
      { rel: [UserRelations.ownTags] },
    );

    return { tags: r.ownTags };
  }
}
