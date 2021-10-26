import {
  Controller,
  NotImplementedException,
  Post,
  Put,
  UseGuards,
  Body,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { LocalAuthGuard } from 'src/layers/domains/testapi/guard/LocalAuthGuard';
import { AuthService } from 'src/layers/domains/testapi/services/AuthService';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';
import { SigninBodyDto } from '../types/SigninBodyDto';
import { SignupBodyDto } from '../types/SignupBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @ApiOperation({ description: 'Регистрация' })
  @Post('/signup')
  public async register(@Body() body: SignupBodyDto): Promise<any> {
    const result = await this.userService.createProfile(body);
    return { result };
  }

  @ApiOperation({ description: 'Вход' })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  public async login(@Body() body: SigninBodyDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ description: 'Выход' })
  @Put('/logout')
  public async logout() {
    throw new NotImplementedException();
  }
}
