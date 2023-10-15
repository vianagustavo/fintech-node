import { CardType } from '@prisma/client';

export interface ICardModel {
  id: string;
  type: CardType;
  number: string;
  cvv: string;
  createdAt: Date;
  updatedAt: Date;
}
