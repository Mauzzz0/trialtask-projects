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

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async profile(@Request() req): Promise<any> {
    return this.userService.findOne({ username: req.user.username });
  }

  @Post('')
  public async create(@Body() body): Promise<any> {
    const result = await this.userService.createOne(body);
    return { result };
  }

  @Put(':id')
  public async update(): Promise<any> {
    throw new NotImplementedException();
  }
}
