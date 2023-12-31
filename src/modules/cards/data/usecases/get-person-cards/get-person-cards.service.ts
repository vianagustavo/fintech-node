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
  IGetPersonCards,
} from 'src/modules/cards/domain';
import { CARDS_REPOSITORY } from 'src/modules/cards/constants';
import { PEOPLE_REPOSITORY, PeopleRepository } from 'src/modules/people';
import {
  PageModel,
  PaginateService,
  PaginationOptionsModel,
} from 'src/common/helpers';
import { PAGINATE_SERVICE } from 'src/common/constants';

@Injectable()
export class DbGetPersonCardsService implements IGetPersonCards {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: CardsRepository,
    @Inject(PEOPLE_REPOSITORY)
    private readonly peopleRepository: PeopleRepository,
    @Inject(PAGINATE_SERVICE)
    private readonly paginateService: PaginateService,
  ) {}
  async execute(
    personId: string,
    paginationOptions?: PaginationOptionsModel,
  ): Promise<PageModel<ICardModel>> {
    const person = await this.peopleRepository.findPersonById(personId);

    if (!person) throw new NotFoundException('Person not found');

    const personCards = await this.cardsRepository.findPersonCards(personId);

    const parsedPersonCards: ICardModel[] = personCards.map(card => {
      const parsedCard: ICardModel = {
        id: card.id,
        type: card.type,
        number: card.number,
        cvv: card.cvv,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      };

      return parsedCard;
    });

    const paginatedCards: PageModel<ICardModel> =
      await this.paginateService.paginate(parsedPersonCards, paginationOptions);

    return paginatedCards;
  }
}
