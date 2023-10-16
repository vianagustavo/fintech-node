import { IRevertTransactionRequestModel, ITransactionModel } from '../models';

export interface IRevertTransaction {
  execute(
    request: IRevertTransactionRequestModel,
    transactionId: string,
    accountId: string,
    personId: string,
  ): Promise<ITransactionModel>;
}
