import { Controller, NotImplementedException, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/layers/domains/testapi/guard/LocalAuthGuard';
import { AuthService } from 'src/layers/domains/testapi/services/AuthService';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ description: 'Sign up' })
  @Post('/register')
  public async register() {
    throw new NotImplementedException();
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Sign in' })
  @Post('/login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'Sign out' })
  @Put('/logout')
  public async logout() {
    throw new NotImplementedException();
  }
}
