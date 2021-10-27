import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './layers/domains/testapi/modules/AuthModule';
import { UsersModule } from './layers/domains/testapi/modules/UsersModule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
