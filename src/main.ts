import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { SetupSwagger } from './common/swagger/helpers/SetupSwagger';
import { ShowRoutesAtStart } from './main/helpers/ShowRoutes';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SetupSwagger(app);

  await app.listen(3000);

  ShowRoutesAtStart(app);
}
bootstrap();
