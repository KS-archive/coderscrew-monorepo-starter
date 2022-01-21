import { applyDecorators, Controller as NestController, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ControllerExceptionFilter } from './controller-exception.filter';

export const HttpController = (name: string) =>
  applyDecorators(NestController(), ApiTags(name), UseFilters(new ControllerExceptionFilter()));
