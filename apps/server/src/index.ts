import { NestFactory } from '@nestjs/core';

import { increment } from '@ccms/utils';

import { STR } from '@/utils/string.utils';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line no-console
  console.log(increment(10), STR);

  await app.listen(3000);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
