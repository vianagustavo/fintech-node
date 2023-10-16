import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IGetAccountBalance } from 'src/modules/accounts/domain';
import { ACCOUNTS_REPOSITORY } from 'src/modules/accounts/constants';
import { AccountsRepository } from '../../repositories';

@Injectable()
export class DbGetAccountBalanceService implements IGetAccountBalance {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
  ) {}
  async execute(
    accountId: string,
    personId: string,
  ): Promise<{ balance: number }> {
    const account = await this.accountsRepository.findAccountById(accountId);

    if (!account) throw new NotFoundException('Account not found');

    const accountBelongsToPerson = account.peopleId === personId;

    if (!accountBelongsToPerson)
      throw new UnauthorizedException('Account does not belong to person');

    return { balance: account.accountBalance };
  }
}
