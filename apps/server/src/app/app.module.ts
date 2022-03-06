import { Module } from '@nestjs/common';

import { AuthModule } from '@ccms/server-auth';
import { PrismaModule } from '@ccms/server-prisma';

@Module({
  imports: [PrismaModule, AuthModule],
})
export class AppModule {}
