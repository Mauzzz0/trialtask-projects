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
import { ProfileDto } from 'src/common/layers/contracts/dto/testapi/ProfileDto';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(ProfileDto)
@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  // constructor(private userService: UsersService) {}

  @Post('')
  public async create(@Request() req): Promise<any> {
    throw new NotImplementedException();
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
