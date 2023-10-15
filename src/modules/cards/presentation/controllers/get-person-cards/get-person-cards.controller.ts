import { Inject, Param, Query, UnauthorizedException } from '@nestjs/common';

import { GET_PERSON_CARDS } from 'src/modules/cards/constants';
import { IGetPersonCards } from 'src/modules/cards/domain';
import { CreateCardResponseDto } from '../../dtos';
import { Person, PersonSessionModel } from 'src/modules/people';
import { GetPersonCards, PersonCardsResource } from '../_decorators';
import { PageModel, PaginationOptionsModel } from 'src/common/helpers';

@PersonCardsResource()
export class GetPersonCardsController {
  constructor(
    @Inject(GET_PERSON_CARDS)
    private readonly getPersonCards: IGetPersonCards,
  ) {}

  @GetPersonCards()
  async index(
    @Param('peopleId') personId: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @Person() person: PersonSessionModel,
  ): Promise<PageModel<CreateCardResponseDto>> {
    if (person.sub !== personId)
      throw new UnauthorizedException("Payload's id does not match");

    const paginationOptions: PaginationOptionsModel = {
      size: size ? size : 4,
      page: page ? page : 1,
    };

    const personCards = await this.getPersonCards.execute(
      personId,
      paginationOptions,
    );

    return personCards;
  }
}
