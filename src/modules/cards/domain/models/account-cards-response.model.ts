import { ICardModel } from './card.model';

export interface IAccountCardsResponseModel {
  id: string;
  branch: string;
  account: string;
  cards: ICardModel[];
  createdAt: Date;
  updatedAt: Date;
}
