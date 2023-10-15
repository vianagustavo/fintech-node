import { ICardModel, ICreateCardRequestModel } from '../../domain/models';

export interface CardsRepository {
  createCard(
    request: ICreateCardRequestModel,
    accountId: string,
  ): Promise<ICardModel>;
  findAccountCards(accountId: string): Promise<ICardModel[]>;
  findPersonCards(personId: string): Promise<ICardModel[]>;
}
