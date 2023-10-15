import { IAccountsModel, ICreateAccountRequestModel } from '../models';

export interface ICreateAccount {
  execute(
    request: ICreateAccountRequestModel,
    peopleId: string,
  ): Promise<IAccountsModel>;
}
