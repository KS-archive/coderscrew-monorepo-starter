import { NestFactory } from '@nestjs/core';

import { increment } from '@ccms/utils';

import { STR } from '@/utils/str';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line no-console
  console.log(increment(10), STR);

  await app.listen(3000);
}

bootstrap().catch((ex) => {
  // eslint-disable-next-line no-console
  console.error(ex);
});
