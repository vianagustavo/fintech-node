import { IAccountsModel, ICreateAccountRequestModel } from '../../domain';

export interface AccountsRepository {
  createAccount(
    request: ICreateAccountRequestModel,
    peopleId: string,
  ): Promise<IAccountsModel>;
  findAccountByNumberAndBranch(
    data: ICreateAccountRequestModel,
  ): Promise<IAccountsModel | null>;
  findAccountsByPersonId(personId: string): Promise<IAccountsModel[]>;
  findAccountById(accountId: string): Promise<IAccountsModel | null>;
}
