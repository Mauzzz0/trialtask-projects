import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SetupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('FARM')
    .setDescription('Farm service API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
