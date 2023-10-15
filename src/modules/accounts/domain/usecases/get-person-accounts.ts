import { IAccountsModel } from '../models';

export interface IGetPersonAccounts {
  execute(peopleId: string): Promise<IAccountsModel[]>;
}
