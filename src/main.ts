import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { SetupSwagger } from './common/swagger/helpers/SetupSwagger';
import { ShowRoutesAtStart } from './main/helpers/ShowRoutes';
import 'reflect-metadata';
import { applyGlobalValidation } from './common/swagger/helpers/applyGlobalValidation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  SetupSwagger(app);
  applyGlobalValidation(app);

  await app.listen(3000);

  ShowRoutesAtStart(app);
}
bootstrap();
