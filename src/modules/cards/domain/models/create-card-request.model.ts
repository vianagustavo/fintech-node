import { CardType } from '@prisma/client';

export interface ICreateCardRequestModel {
  type: CardType;
  number: string;
  cvv: string;
}

export enum CardTypeEnum {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
}
