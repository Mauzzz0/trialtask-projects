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
import { BaseTagDto } from 'src/common/layers/contracts/dto/testapi/BaseTagDto';
import { TagsDto } from 'src/common/layers/contracts/dto/testapi/TagsDto';
import { UserWithTagsDto } from 'src/common/layers/contracts/dto/testapi/UserWithTagsDto';
import { UserWithUidAndPasswordDto } from 'src/common/layers/contracts/dto/testapi/UserWithUidAndPasswordDto';
import { User } from 'src/common/layers/rest/decorators/User';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';

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
  @ApiOkResponse(UserWithTagsDto)
  @Get('')
  public async show(@User() user: any): Promise<any> {
    // todo сюда выводить все теги из UserTag
    console.log('zz', user);
    return this.userService.profile({ username: user.username });
    // return this.userService.findOneFull({ username: req.user.username });
  }

  @ApiOperation({ description: 'Обновление профиля' })
  @ApiOkResponse(UserWithUidAndPasswordDto)
  @Put('')
  public async update(@Request() req): Promise<any> {
    // return this.userService.update({});
  }

  @ApiOperation({ description: 'Удаление профиля' })
  @Delete('')
  public async destroy(@User() user: any): Promise<any> {
    // /logout
    return this.userService.remove({ username: user.username });
  }

  @ApiOperation({ description: 'Добавление тэга себе в тэг-лист' })
  @Post('/tag')
  public async createTag(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @ApiOperation({ description: 'Удаление тэга из своего тэг-листа' })
  @Delete('/tag/:id')
  public async destroyTag(@User() user: any, @Param('id') id: number): Promise<any> {
    // console.log(user, id);
    return await this.userService.removeUserTag({ username: user.username, tagId: id });
    // throw new NotImplementedException();
  }

  @ApiOperation({ description: 'Тэги, которые я создал' })
  @ApiOkResponse(TagsDto)
  @Get('/tag/my')
  public async showTag(@Request() req): Promise<any> {
    return await this.userService.tagsForUser({ username: req.user.username });
  }
}
