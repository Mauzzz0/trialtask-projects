import { Module } from '@nestjs/common';
import { AuthController } from 'src/layers/gateways/rest/testapi/controller/AuthController';
import { AuthService } from '../services/AuthService';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../services/LocalStrategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwtConstants';
import { JwtStrategy } from '../services/JwtStrategy';
import { UsersService } from '../services/UsersService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/layers/storage/postgres/entities/User';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.ttl },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
