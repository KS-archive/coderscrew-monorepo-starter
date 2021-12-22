import { Injectable } from '@nestjs/common';

import { STR } from '@/utils/str';

@Injectable()
export class AppService {
  getHello(): string {
    return STR;
  }
}
