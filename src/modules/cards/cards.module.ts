import { Module } from '@nestjs/common';
import {
  CARDS_REPOSITORY,
  CREATE_CARD,
  GET_ACCOUNT_CARDS,
  GET_PERSON_CARDS,
} from './constants';
import { PrismaCardsRepository } from './infra';
import {
  DbCreateCardService,
  DbGetAccountCardsService,
  DbGetPersonCardsService,
} from './data';
import { AccountsModule } from '../accounts/accounts.module';
import {
  CreateCardController,
  GetAccountCardsController,
  GetPersonCardsController,
} from './presentation';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [AccountsModule, PeopleModule],
  providers: [
    {
      provide: CARDS_REPOSITORY,
      useClass: PrismaCardsRepository,
    },
    {
      provide: CREATE_CARD,
      useClass: DbCreateCardService,
    },
    {
      provide: GET_ACCOUNT_CARDS,
      useClass: DbGetAccountCardsService,
    },
    {
      provide: GET_PERSON_CARDS,
      useClass: DbGetPersonCardsService,
    },
  ],
  controllers: [
    CreateCardController,
    GetAccountCardsController,
    GetPersonCardsController,
  ],
  exports: [],
})
export class CardsModule {}
