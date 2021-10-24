import { Module } from '@nestjs/common';
import { AuthController } from 'src/layers/gateways/rest/testapi/controller/AuthController';
import { AuthService } from '../services/AuthService';
import { UsersModule } from './UsersModule';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../services/LocalStrategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwtConstants';
import { JwtStrategy } from '../services/JwtStrategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.ttl },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
