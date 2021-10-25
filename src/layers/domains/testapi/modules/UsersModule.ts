import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from 'src/layers/gateways/rest/testapi/controller/TagController';
import { UserController } from 'src/layers/gateways/rest/testapi/controller/UserController';
import { Tag } from 'src/layers/storage/postgres/entities/Tag';
import { User } from 'src/layers/storage/postgres/entities/User';
import { UsersService } from '../services/UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag])],
  providers: [UsersService],
  controllers: [UserController, TagController],
  exports: [UsersService],
})
export class UsersModule {}
