import { Module } from '@nestjs/common';
import {
  CREATE_TRANSACTION,
  GET_ACCOUNT_TRANSACTIONS,
  REVERT_TRANSACTION,
  TRANSACTIONS_REPOSITORY,
} from './constants';
import { PrismaTransactionRepository } from './infra';
import {
  DbCreateTransactionService,
  DbGetAccountTransactionsService,
  DbRevertTransactionService,
} from './data';
import { AccountsModule } from '../accounts/accounts.module';
import {
  CreateTransactionController,
  GetAccountTransactionsController,
  RevertTransactionController,
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
      provide: REVERT_TRANSACTION,
      useClass: DbRevertTransactionService,
    },
    {
      provide: TRANSACTIONS_REPOSITORY,
      useClass: PrismaTransactionRepository,
    },
  ],
  controllers: [
    CreateTransactionController,
    GetAccountTransactionsController,
    RevertTransactionController,
  ],
  exports: [],
})
export class TransactionsModule {}
