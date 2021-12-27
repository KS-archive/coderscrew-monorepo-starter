import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { env } from './shared/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  await app.listen(env.get('SERVER_PORT'));

  logger.log(`Application listening at ${await app.getUrl()}`.replace('[::1]', 'localhost'));
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
