import { Body, Inject, Param } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { CreateCard, CreateCardResource } from '../_decorators';

import { CREATE_CARD } from 'src/modules/cards/constants';
import { ICreateCard } from 'src/modules/cards/domain';
import { CreateCardRequestDto, CreateCardResponseDto } from '../../dtos';
import { Person, PersonSessionModel } from 'src/modules/people';

@CreateCardResource()
export class CreateCardController {
  constructor(
    @Inject(CREATE_CARD)
    private readonly createCard: ICreateCard,
  ) {}

  @CreateCard()
  async create(
    @Body() request: CreateCardRequestDto,
    @Param('accountId') accountId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateCardResponseDto> {
    const card = await this.createCard.execute(request, accountId, person.sub);

    return plainToInstance(CreateCardResponseDto, card);
  }
}
