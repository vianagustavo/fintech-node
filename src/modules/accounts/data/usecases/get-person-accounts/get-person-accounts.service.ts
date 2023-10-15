import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PEOPLE_REPOSITORY } from 'src/modules/people/constants';

import {
  IAccountsModel,
  IGetPersonAccounts,
} from 'src/modules/accounts/domain';
import { ACCOUNTS_REPOSITORY } from 'src/modules/accounts/constants';
import { AccountsRepository } from '../../repositories';
import { PeopleRepository } from 'src/modules/people/data';

@Injectable()
export class DbGetPersonAccountsService implements IGetPersonAccounts {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
    @Inject(PEOPLE_REPOSITORY)
    private readonly peopleRepository: PeopleRepository,
  ) {}
  async execute(peopleId: string): Promise<IAccountsModel[]> {
    const existingPerson = await this.peopleRepository.findPersonById(peopleId);

    if (!existingPerson) throw new NotFoundException('Person id is invalid');

    const accounts = await this.accountsRepository.findAccountsByPersonId(
      peopleId,
    );

    return accounts;
  }
}
