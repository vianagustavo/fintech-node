import { Inject, Param, Query, UnauthorizedException } from '@nestjs/common';

import { GET_PERSON_CARDS } from 'src/modules/cards/constants';
import { IGetPersonCards } from 'src/modules/cards/domain';
import { CardsPageDto, CreateCardResponseDto } from '../../dtos';
import { Person, PersonSessionModel } from 'src/modules/people';
import { GetPersonCards, PersonCardsResource } from '../_decorators';
import { PageModel, PaginationOptionsModel } from 'src/common/helpers';
import { plainToInstance } from 'class-transformer';

@PersonCardsResource()
export class GetPersonCardsController {
  constructor(
    @Inject(GET_PERSON_CARDS)
    private readonly getPersonCards: IGetPersonCards,
  ) {}

  @GetPersonCards()
  async index(
    @Param('peopleId') personId: string,
    @Query('size') size: string,
    @Query('page') page: string,
    @Person() person: PersonSessionModel,
  ): Promise<CardsPageDto> {
    if (person.sub !== personId)
      throw new UnauthorizedException("Payload's id does not match");

    const paginationOptions: PaginationOptionsModel = {
      size: size ? Number(size) : 4,
      page: page ? Number(page) : 1,
    };

    const personCards = await this.getPersonCards.execute(
      personId,
      paginationOptions,
    );

    return plainToInstance(CardsPageDto, personCards);
  }
}
