import { ICardModel, ICreateCardRequestModel } from '../models';

export interface ICreateCard {
  execute(
    request: ICreateCardRequestModel,
    accountId: string,
    personId: string,
  ): Promise<ICardModel>;
}
