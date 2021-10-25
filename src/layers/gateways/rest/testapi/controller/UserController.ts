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
import { BaseTagDto } from 'src/common/layers/contracts/dto/testapi/BaseTagDto';
import { TagsDto } from 'src/common/layers/contracts/dto/testapi/TagsDto';
import { UserWithTagsDto } from 'src/common/layers/contracts/dto/testapi/UserWithTagsDto';
import { UserWithUidAndPasswordDto } from 'src/common/layers/contracts/dto/testapi/UserWithUidAndPasswordDto';
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

  @ApiOkResponse(UserWithTagsDto)
  @Get('')
  public async show(@Request() req): Promise<any> {
    console.log('zz', req.user);
    return this.userService.profile({ username: req.user.username });
    // return this.userService.findOneFull({ username: req.user.username });
  }

  @ApiOkResponse(UserWithUidAndPasswordDto)
  @Put('')
  public async update(@Request() req): Promise<any> {
    // return this.userService.update({});
  }

  @Delete('')
  public async destroy(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @Post('/tag')
  public async createTag(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @Delete('/tag/:id')
  public async destroyTag(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }

  @ApiOkResponse(TagsDto)
  @Get('/tag/my')
  public async showTag(@Request() req): Promise<any> {
    return await this.userService.tagsForUser({ username: req.user.username });
  }
}
