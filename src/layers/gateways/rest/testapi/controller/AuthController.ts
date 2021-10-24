import {
  Controller,
  NotImplementedException,
  Post,
  Put,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/layers/domains/testapi/guard/LocalAuthGuard';
import { AuthService } from 'src/layers/domains/testapi/services/AuthService';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('/signup')
  public async register(@Body() body): Promise<any> {
    const result = await this.userService.createOne(body);
    return { result };
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Sign in' })
  @Post('/signin')
  public async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'Sign out' })
  @Put('/logout')
  public async logout() {
    throw new NotImplementedException();
  }
}
