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
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInPayload } from 'src/common/layers/contracts/dto/testapi/SignInPayload';
import { ResultPayload } from 'src/common/layers/contracts/dto/testapi/ResultPayload';
import { ResponseWithStatusInterceptor } from 'src/common/layers/rest/interceptors/ResponseWithStatus';
import { ApiOkResponse } from 'src/common/swagger/decorators/ApiOkResponse';
import { HttpExceptionFilter } from 'src/common/swagger/filters/HttpExceptionFilter';
import { LocalAuthGuard } from 'src/layers/domains/testapi/guard/LocalAuthGuard';
import { AuthService } from 'src/layers/domains/testapi/services/AuthService';
import { UsersService } from 'src/layers/domains/testapi/services/UsersService';
import { SigninBodyDto } from '../types/SigninBodyDto';
import { SignupBodyDto } from '../types/SignupBodyDto';

@UseInterceptors(ResponseWithStatusInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(ResultPayload, SignInPayload)
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @ApiOperation({ description: 'Регистрация' })
  @ApiOkResponse(ResultPayload)
  @Post('/signup')
  public async register(@Body() body: SignupBodyDto): Promise<ResultPayload> {
    const result = await this.userService.createProfile(body);
    return result;
  }

  @ApiOperation({ description: 'Вход' })
  @ApiOkResponse(SignInPayload)
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  public async login(@Body() body: SigninBodyDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ description: 'Выход' })
  @Put('/logout')
  public async logout() {
    // )))
    throw new NotImplementedException();
  }
}
