import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const HttpValidationPipe = new ValidationPipe({
  whitelist: true,
  exceptionFactory: (exceptions) => {
    const errors = exceptions.flatMap((exception) => Object.values(exception.constraints ?? {})).join(', ');

    return new BadRequestException(errors);
  },
});
