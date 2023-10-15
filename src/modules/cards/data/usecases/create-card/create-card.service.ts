import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CardsRepository } from '../../repositories';
import {
  ICardModel,
  ICreateCard,
  ICreateCardRequestModel,
} from 'src/modules/cards/domain';
import { CARDS_REPOSITORY } from 'src/modules/cards/constants';
import { ACCOUNTS_REPOSITORY, AccountsRepository } from 'src/modules/accounts';
import { CardType } from '@prisma/client';

@Injectable()
export class DbCreateCardService implements ICreateCard {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository,
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
  ) {}
  async execute(
    request: ICreateCardRequestModel,
    accountId: string,
    personId: string,
  ): Promise<ICardModel> {
    const existingAccount = await this.accountsRepository.findAccountById(
      accountId,
    );

    if (!existingAccount) throw new NotFoundException('Account not found');

    const peopleAccounts = await this.accountsRepository.findAccountsByPersonId(
      personId,
    );

    const accountBelongsToPerson = peopleAccounts.some(
      account => account.id === accountId,
    );

    if (!accountBelongsToPerson)
      throw new UnauthorizedException('Account does not belong to person');

    const accountCards = await this.cardsRepository.findAccountCards(accountId);

    const accountHasPhysicalCard = accountCards.some(
      account => account.type === CardType.PHYSICAL,
    );

    if (request.type === CardType.PHYSICAL && accountHasPhysicalCard)
      throw new BadRequestException('Account already posesses a physical card');

    const card = await this.cardsRepository.createCard(request, accountId);

    const cardLastDigits = card.number.slice(-4);

    const cardReturnObj: ICardModel = {
      id: card.id,
      type: card.type,
      number: cardLastDigits,
      cvv: card.cvv,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };

    return cardReturnObj;
  }
}
