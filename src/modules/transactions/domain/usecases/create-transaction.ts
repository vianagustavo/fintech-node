import { ICreateTransactionRequestModel, ITransactionModel } from '../models';

export interface ICreateTransaction {
  execute(
    request: ICreateTransactionRequestModel,
    accountId: string,
    personId: string,
  ): Promise<ITransactionModel>;
}
