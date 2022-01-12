// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';

export class ValidationRestApiError {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({ default: 'Bad Request' })
  error: string;
}

export class UnauthorizedRestApiError {
  @ApiProperty({ default: 401 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Unauthorized' })
  error: string;
}

export class ConflictRestApiError {
  @ApiProperty({ default: 409 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Conflict' })
  error: string;
}
