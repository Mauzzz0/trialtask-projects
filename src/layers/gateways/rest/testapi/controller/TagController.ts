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
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels()
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
