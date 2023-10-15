import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PEOPLE_REPOSITORY } from 'src/modules/people/constants';

import { ICreatePersonRequestModel } from 'src/modules/people/domain';
import {
  IAccountsModel,
  ICreateAccount,
  ICreateAccountRequestModel,
} from 'src/modules/accounts/domain';
import { ACCOUNTS_REPOSITORY } from 'src/modules/accounts/constants';
import { AccountsRepository } from '../../repositories';
import { PeopleRepository } from 'src/modules/people/data';

@Injectable()
export class DbCreateAccountService implements ICreateAccount {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
    @Inject(PEOPLE_REPOSITORY)
    private readonly peopleRepository: PeopleRepository,
  ) {}
  async execute(
    request: ICreateAccountRequestModel,
    peopleId: string,
  ): Promise<IAccountsModel> {
    const existingPerson = await this.peopleRepository.findPersonById(peopleId);

    if (!existingPerson) throw new NotFoundException('Person id is invalid');

    const existingAccount =
      await this.accountsRepository.findAccountByNumberAndBranch(request);

    if (existingAccount)
      throw new BadRequestException(
        'Account with same branch and number already exists',
      );

    const account = await this.accountsRepository.createAccount(
      request,
      peopleId,
    );

    return account;
  }
}
