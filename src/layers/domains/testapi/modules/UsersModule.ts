import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/layers/gateways/rest/testapi/controller/UserController';
import { Role } from 'src/layers/storage/mssql/entities/Role';
import { User } from 'src/layers/storage/mssql/entities/User';
import { UsersService } from '../services/UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
