import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ACCOUNTS_REPOSITORY } from 'src/modules/accounts/constants';
import { TransactionsRepository } from '../../repositories';
import {
  ICreateTransaction,
  ICreateTransactionRequestModel,
  ITransactionModel,
} from 'src/modules/transactions/domain';
import { TRANSACTIONS_REPOSITORY } from 'src/modules/transactions/constants';
import { AccountsRepository } from 'src/modules/accounts/data';

@Injectable()
export class DbCreateTransactionService implements ICreateTransaction {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: TransactionsRepository,
  ) {}
  async execute(
    request: ICreateTransactionRequestModel,
    accountId: string,
    personId: string,
  ): Promise<ITransactionModel> {
    const account = await this.accountsRepository.findAccountById(accountId);

    if (!account) throw new NotFoundException('Account not found');

    const peopleAccounts = await this.accountsRepository.findAccountsByPersonId(
      personId,
    );

    const accountBelongsToPerson = peopleAccounts.some(
      account => account.id === accountId,
    );

    if (!accountBelongsToPerson)
      throw new UnauthorizedException('Account does not belong to person');

    const updatedBalance = account.accountBalance + request.value;

    if (updatedBalance < 0)
      throw new BadRequestException('Insufficent account funds');

    const transaction = await this.transactionsRepository.createTransaction(
      request,
      accountId,
      updatedBalance,
    );

    return transaction;
  }
}
