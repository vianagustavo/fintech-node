import { Module } from '@nestjs/common';
import {
  ACCOUNTS_REPOSITORY,
  CREATE_ACCOUNT,
  GET_ACCOUNT_BALANCE,
  GET_PERSON_ACCOUNTS,
} from './constants';
import { PrismaAccountsRepository } from './infra';
import {
  DbCreateAccountService,
  DbGetAccountBalanceService,
  DbGetPersonAccountsService,
} from './data';
import {
  CreateAccountController,
  GetAccountBalanceController,
  GetPersonAccountsController,
} from './presentation';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [PeopleModule],
  providers: [
    {
      provide: ACCOUNTS_REPOSITORY,
      useClass: PrismaAccountsRepository,
    },
    {
      provide: CREATE_ACCOUNT,
      useClass: DbCreateAccountService,
    },
    {
      provide: GET_ACCOUNT_BALANCE,
      useClass: DbGetAccountBalanceService,
    },
    {
      provide: GET_PERSON_ACCOUNTS,
      useClass: DbGetPersonAccountsService,
    },
  ],
  controllers: [
    CreateAccountController,
    GetAccountBalanceController,
    GetPersonAccountsController,
  ],
  exports: [ACCOUNTS_REPOSITORY],
})
export class AccountsModule {}
