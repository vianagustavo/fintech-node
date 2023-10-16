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
  IRevertTransaction,
  IRevertTransactionRequestModel,
  ITransactionModel,
} from 'src/modules/transactions/domain';
import { TRANSACTIONS_REPOSITORY } from 'src/modules/transactions/constants';
import { AccountsRepository } from 'src/modules/accounts/data';

@Injectable()
export class DbRevertTransactionService implements IRevertTransaction {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: TransactionsRepository,
  ) {}
  async execute(
    request: IRevertTransactionRequestModel,
    transactionId: string,
    accountId: string,
    personId: string,
  ): Promise<ITransactionModel> {
    const transaction = await this.transactionsRepository.findTransactionById(
      transactionId,
    );

    if (!transaction) throw new NotFoundException('Transaction not found');

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

    const updatedBalance = account.accountBalance - transaction.value;

    if (updatedBalance < 0)
      throw new BadRequestException('Insufficent account funds');

    if (!!transaction.revertedAt)
      throw new BadRequestException(
        `Transaction has already been reverted at ${transaction.revertedAt}`,
      );

    await this.transactionsRepository.revertTransaction(
      transactionId,
      accountId,
      updatedBalance,
    );

    const revertedTransaction: ITransactionModel = {
      id: transaction.id,
      value: -transaction.value,
      description: request.description,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

    return revertedTransaction;
  }
}
