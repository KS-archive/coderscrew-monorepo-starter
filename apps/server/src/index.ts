import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { env } from './shared/env';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });

  const config = new DocumentBuilder()
    .setTitle('CCMS API Docs')
    .setDescription('API Documentation for the CodersCrew Monorepo Starter')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(env.get('SERVER_PORT'));

  logger.log(`Application listening at ${await app.getUrl()}`.replace('[::1]', 'localhost'));
}

bootstrap().catch((error) => {
  logger.error(error);
});
