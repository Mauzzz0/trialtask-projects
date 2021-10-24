import {
  Body,
  Controller,
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
import { RolesGuard } from 'src/layers/domains/testapi/guard/RolesGuard';
import { Roles } from 'src/layers/domains/testapi/rbac/decorators/Roles';
import { Role } from 'src/layers/domains/testapi/rbac/roles/roles';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiExtraModels(ProfileDto)
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse(ProfileDto)
  @Get('profile')
  public async profile(@Request() req): Promise<any> {
    return this.userService.findOne({ username: req.user.username });
  }

  @Put('')
  public async create(@Request() req): Promise<any> {
    throw new NotImplementedException();
  }
}
