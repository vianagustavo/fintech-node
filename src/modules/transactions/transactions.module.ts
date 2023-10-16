import { Module } from '@nestjs/common';
import {
  CREATE_TRANSACTION,
  GET_ACCOUNT_TRANSACTIONS,
  TRANSACTIONS_REPOSITORY,
} from './constants';
import { PrismaTransactionRepository } from './infra';
import {
  DbCreateTransactionService,
  DbGetAccountTransactionsService,
} from './data';
import { AccountsModule } from '../accounts/accounts.module';
import {
  CreateTransactionController,
  GetAccountTransactionsController,
} from './presentation';

@Module({
  imports: [AccountsModule],
  providers: [
    {
      provide: CREATE_TRANSACTION,
      useClass: DbCreateTransactionService,
    },
    {
      provide: GET_ACCOUNT_TRANSACTIONS,
      useClass: DbGetAccountTransactionsService,
    },
    {
      provide: TRANSACTIONS_REPOSITORY,
      useClass: PrismaTransactionRepository,
    },
  ],
  controllers: [CreateTransactionController, GetAccountTransactionsController],
  exports: [],
})
export class TransactionsModule {}
