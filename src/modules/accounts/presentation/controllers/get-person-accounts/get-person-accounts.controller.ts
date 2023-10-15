import { Inject, Param, UnauthorizedException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { CreateAccountResponseDto } from '../../dtos';
import { GET_PERSON_ACCOUNTS } from 'src/modules/accounts/constants';
import { IGetPersonAccounts } from 'src/modules/accounts/domain';
import { GetPersonAccounts, GetPersonAccountsResource } from '../_decorators';
import { Person, PersonSessionModel } from 'src/modules/people';

@GetPersonAccountsResource()
export class GetPersonAccountsController {
  constructor(
    @Inject(GET_PERSON_ACCOUNTS)
    private readonly getPersonAccounts: IGetPersonAccounts,
  ) {}

  @GetPersonAccounts()
  async index(
    @Param('peopleId') peopleId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateAccountResponseDto[]> {
    if (person.sub !== peopleId)
      throw new UnauthorizedException(
        "Payload's id doesn't match with peopleId",
      );

    const accounts = await this.getPersonAccounts.execute(peopleId);

    return plainToInstance(CreateAccountResponseDto, accounts);
  }
}
