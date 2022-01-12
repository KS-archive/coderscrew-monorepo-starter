import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { AccountStatus } from '../account/account.entity';

export const ME_ENDPOINT = '/auth/me';

export class MeResponse {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(AccountStatus)
  @ApiProperty({ enum: AccountStatus, enumName: 'AccountStatus' })
  status: AccountStatus;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
