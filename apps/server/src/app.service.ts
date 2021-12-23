import { Injectable } from '@nestjs/common';

import { STR } from '@/utils/string.utils';

@Injectable()
export class AppService {
  getHello(): string {
    return STR;
  }
}
