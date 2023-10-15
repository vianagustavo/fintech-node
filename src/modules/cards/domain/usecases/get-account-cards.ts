import { IAccountCardsResponseModel } from '../models';

export interface IGetAccountCards {
  execute(
    accountId: string,
    personId: string,
  ): Promise<IAccountCardsResponseModel>;
}
