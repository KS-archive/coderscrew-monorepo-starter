import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponseMetadata } from '@nestjs/swagger';

type Body = NonNullable<ApiResponseMetadata['type']>;

export const HttpOkResponse = (body?: Body) => applyDecorators(HttpCode(HttpStatus.OK), ApiOkResponse({ type: body }));
export const HttpCreatedResponse = (body?: Body) =>
  applyDecorators(HttpCode(HttpStatus.CREATED), ApiCreatedResponse({ type: body }));
export const HttpNoContentResponse = () => applyDecorators(HttpCode(HttpStatus.NO_CONTENT), ApiNoContentResponse());
