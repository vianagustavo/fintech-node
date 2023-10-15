import { Inject, Injectable } from '@nestjs/common';

import { CardsRepository } from '../../data';
import { PrismaService } from 'src/common/database';
import { PRISMA_SERVICE } from 'src/common/constants';
import { ICardModel, ICreateCardRequestModel } from '../../domain';
import { CardType } from '@prisma/client';

@Injectable()
export class PrismaCardsRepository implements CardsRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createCard(
    request: ICreateCardRequestModel,
    accountId: string,
  ): Promise<ICardModel> {
    const cardType = request.type as unknown as CardType;

    const card = await this.prismaService.card.create({
      data: {
        number: request.number,
        cvv: request.cvv,
        type: cardType,
        accountId,
      },
    });

    return card;
  }

  async findAccountCards(accountId: string): Promise<ICardModel[]> {
    const accountCards = await this.prismaService.card.findMany({
      where: {
        accountId,
      },
    });

    return accountCards;
  }

  async findPersonCards(personId: string): Promise<ICardModel[]> {
    const personCards = await this.prismaService.card.findMany({
      where: {
        account: {
          peopleId: personId,
        },
      },
    });

    return personCards;
  }
}
