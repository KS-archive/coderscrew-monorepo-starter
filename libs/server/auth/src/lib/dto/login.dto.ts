import { createZodDto } from "@anatine/zod-nestjs";
import { loginBodySchema } from "@ccms/api";

export class LoginDto extends createZodDto(loginBodySchema) {}
