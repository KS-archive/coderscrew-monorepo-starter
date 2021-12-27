import { IsEmail, IsNotEmpty } from 'class-validator';

import { Account } from '../account/account.entity';

export class RegisterDto implements Partial<Account> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
