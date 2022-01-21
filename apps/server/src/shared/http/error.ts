import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

class HttpErrorBody {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

const httpErrors = {
  BadRequest: ApiBadRequestResponse({ type: HttpErrorBody }),
  Unauthorized: ApiUnauthorizedResponse({ type: HttpErrorBody }),
  Conflict: ApiConflictResponse({ type: HttpErrorBody }),
  InternalServerError: ApiInternalServerErrorResponse({ type: HttpErrorBody }),
};

export const HttpErrors = (...errors: (keyof typeof httpErrors)[]) =>
  applyDecorators(...errors.map((error) => httpErrors[error]));
