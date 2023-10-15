import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CardsRepository } from '../../repositories';
import {
  IAccountCardsResponseModel,
  ICardModel,
  IGetAccountCards,
} from 'src/modules/cards/domain';
import { CARDS_REPOSITORY } from 'src/modules/cards/constants';
import { ACCOUNTS_REPOSITORY, AccountsRepository } from 'src/modules/accounts';

@Injectable()
export class DbGetAccountCardsService implements IGetAccountCards {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository,
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
  ) {}
  async execute(
    accountId: string,
    personId: string,
  ): Promise<IAccountCardsResponseModel> {
    const account = await this.accountsRepository.findAccountById(accountId);

    if (!account) throw new NotFoundException('Account not found');

    const peopleAccounts = await this.accountsRepository.findAccountsByPersonId(
      personId,
    );

    const accountBelongsToPerson = peopleAccounts.some(
      account => account.id === accountId,
    );

    if (!accountBelongsToPerson)
      throw new UnauthorizedException('Account does not belong to person');

    const accountCards = await this.cardsRepository.findAccountCards(accountId);

    const parsedAccountCards = accountCards.map(card => {
      const parsedCard: ICardModel = {
        id: card.id,
        type: card.type,
        number: card.number.slice(-4),
        cvv: card.cvv,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      };

      return parsedCard;
    });

    const accountCardsToReturn: IAccountCardsResponseModel = {
      id: account.id,
      branch: account.branch,
      account: account.account,
      cards: parsedAccountCards,
      createdAt: account.createdAt,
      updatedAt: account.createdAt,
    };

    return accountCardsToReturn;
  }
}
