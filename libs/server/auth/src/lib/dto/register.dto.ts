import { createZodDto } from "@anatine/zod-nestjs";
import { registerBodySchema } from "@ccms/api";

export class RegisterDto extends createZodDto(registerBodySchema) {}
