import { Inject, Param } from '@nestjs/common';

import { GET_ACCOUNT_BALANCE } from 'src/modules/accounts/constants';
import { IGetAccountBalance } from 'src/modules/accounts/domain';
import { GetAccountBalance, GetAccountBalanceResource } from '../_decorators';
import { Person, PersonSessionModel } from 'src/modules/people';

@GetAccountBalanceResource()
export class GetAccountBalanceController {
  constructor(
    @Inject(GET_ACCOUNT_BALANCE)
    private readonly getAccountBalance: IGetAccountBalance,
  ) {}

  @GetAccountBalance()
  async index(
    @Param('accountId') accountId: string,
    @Person() person: PersonSessionModel,
  ): Promise<{ balance: number }> {
    const accountBalance = await this.getAccountBalance.execute(
      accountId,
      person.sub,
    );

    return accountBalance;
  }
}
