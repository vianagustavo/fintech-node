import { Inject, Param } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { GET_ACCOUNT_CARDS } from 'src/modules/cards/constants';
import { IGetAccountCards } from 'src/modules/cards/domain';
import { CreateCardResponseDto } from '../../dtos';
import { Person, PersonSessionModel } from 'src/modules/people';
import { AccountCardsResource, GetAccountCards } from '../_decorators';

@AccountCardsResource()
export class GetAccountCardsController {
  constructor(
    @Inject(GET_ACCOUNT_CARDS)
    private readonly getAccountCards: IGetAccountCards,
  ) {}

  @GetAccountCards()
  async index(
    @Param('accountId') accountId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateCardResponseDto> {
    const accountCards = await this.getAccountCards.execute(
      accountId,
      person.sub,
    );

    return plainToInstance(CreateCardResponseDto, accountCards);
  }
}
