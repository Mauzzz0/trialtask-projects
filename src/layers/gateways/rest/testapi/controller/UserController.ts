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
import { JwtAuthGuard } from 'src/layers/domains/testapi/guard/JwtAuthGuard';
import { RolesGuard } from 'src/layers/domains/testapi/guard/RolesGuard';
import { Roles } from 'src/layers/domains/testapi/rbac/decorators/Roles';
import { Role } from 'src/layers/domains/testapi/rbac/roles/roles';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  public async profile(@Request() req): Promise<any> {
    return this.userService.findOne({ username: req.user.username });
  }

  @Roles(Role.SAdmin)
  @Post('')
  public async create(@Body() req): Promise<any> {
    const result = await this.userService.createOne(req);
    return { result };
  }

  @Put(':id')
  public async update(): Promise<any> {
    throw new NotImplementedException();
  }
}
