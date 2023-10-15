import { Module } from '@nestjs/common';
import {
  ACCOUNTS_REPOSITORY,
  CREATE_ACCOUNT,
  GET_PERSON_ACCOUNTS,
} from './constants';
import { PrismaAccountsRepository } from './infra';
import { DbCreateAccountService, DbGetPersonAccountsService } from './data';
import {
  CreateAccountController,
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
      provide: GET_PERSON_ACCOUNTS,
      useClass: DbGetPersonAccountsService,
    },
  ],
  controllers: [CreateAccountController, GetPersonAccountsController],
})
export class AccountsModule {}
