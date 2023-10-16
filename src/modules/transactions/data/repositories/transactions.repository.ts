import {
  ICreateTransactionRequestModel,
  ITransactionModel,
} from '../../domain';

export interface TransactionsRepository {
  createTransaction(
    request: ICreateTransactionRequestModel,
    accountId: string,
    updatedBalance: number,
  ): Promise<ITransactionModel>;
  getAccountTransactions(accountId: string): Promise<ITransactionModel[]>;
  findTransactionById(transactionId: string): Promise<ITransactionModel | null>;
  revertTransaction(
    transactionId: string,
    accountId: string,
    updatedBalance: number,
  ): Promise<boolean>;
}
