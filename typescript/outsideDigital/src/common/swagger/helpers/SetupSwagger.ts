import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SetupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Outside Digital')
    .setDescription('API тестового задания Outside Digital')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
