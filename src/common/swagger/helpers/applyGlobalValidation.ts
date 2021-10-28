import { INestApplication, ValidationPipe } from '@nestjs/common';

export const applyGlobalValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
};
