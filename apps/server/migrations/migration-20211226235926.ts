import { Migration } from '@mikro-orm/migrations';

export class Migration20211226235926 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "status" text check ("status" in (\'inactive\', \'active\')) not null);');
    this.addSql('alter table "account" add constraint "account_pkey" primary key ("id");');
    this.addSql('alter table "account" add constraint "account_email_unique" unique ("email");');
  }

}
