import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { RolesGuard } from 'src/layers/domains/testapi/guard/RolesGuard';
import { Roles } from 'src/layers/domains/testapi/rbac/decorators/Roles';
import { Role } from 'src/layers/domains/testapi/rbac/roles/roles';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  public async profile(@Request() req): Promise<any> {
    return this.userService.findOne({ username: req.user.username });
  }

  @Put(':id')
  public async update(): Promise<any> {
    throw new NotImplementedException();
  }
}
