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
import { TagsDto } from 'src/common/layers/contracts/dto/testapi/TagsDto';
import { UserWithTagsDto } from 'src/common/layers/contracts/dto/testapi/UserWithTagsDto';
import { UserWithUidAndPasswordDto } from 'src/common/layers/contracts/dto/testapi/UserWithUidAndPasswordDto';
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
@ApiExtraModels(UserWithUidAndPasswordDto, UserWithTagsDto, TagsDto)
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ description: 'Профиль со всеми тэгами' })
  // @ApiOkResponse(UserWithTagsDto)
  @Get('')
  public async show(@User() user: any): Promise<any> {
    return this.userService.findOneByFilter(
      { username: user.username },
      { rel: [UserRelations.tagList] },
    );
  }

  @ApiOperation({ description: 'Обновление профиля' })
  @ApiOkResponse(UserWithUidAndPasswordDto)
  @Put('')
  public async update(@User() user: any, @Body() body: UpdateProfileBodyDto): Promise<any> {
    return this.userService.updateProfile(user, body);
  }

  @ApiOperation({ description: 'Удаление профиля' })
  @Delete('')
  public async destroy(@User() user: any): Promise<any> {
    return this.userService.removeProfile(user);
  }

  @ApiOperation({ description: 'Добавление тэга себе в тэг-лист' })
  @Post('/tag')
  public async createTag(@User() user: any, @Body() body: AddTagToUserBodyDto): Promise<any> {
    return this.userService.addTasgToUser(user, body.tags);
  }

  @ApiOperation({ description: 'Удаление тэга из своего тэг-листа' })
  @Delete('/tag/:id')
  public async destroyTag(@User() user: any, @Param('id') id: number): Promise<any> {
    return await this.userService.removeTasgFromUser(user, id);
  }

  @ApiOperation({ description: 'Тэги, которые я создал' })
  @ApiOkResponse(TagsDto)
  @Get('/tag/my')
  public async showTags(@User() user: any): Promise<any> {
    return await this.userService.findOneByFilter(
      { username: user.username },
      { rel: [UserRelations.ownTags] },
    );
  }
}
