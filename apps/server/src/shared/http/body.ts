import { ApiBody, ApiResponseMetadata } from '@nestjs/swagger';

export const HttpBody = (body: ApiResponseMetadata['type']) => ApiBody({ type: body });
