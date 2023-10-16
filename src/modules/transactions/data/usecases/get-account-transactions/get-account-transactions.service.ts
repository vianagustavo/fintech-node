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
  ICreateTransactionRequestModel,
  IGetAccountTransactions,
  ITransactionModel,
} from 'src/modules/transactions/domain';
import { TRANSACTIONS_REPOSITORY } from 'src/modules/transactions/constants';
import { AccountsRepository } from 'src/modules/accounts/data';
import {
  PageModel,
  PaginateService,
  PaginationOptionsModel,
} from 'src/common/helpers';
import { PAGINATE_SERVICE } from 'src/common/constants';
import { DateRangeOptions } from 'src/common/helpers/date-range-options';

@Injectable()
export class DbGetAccountTransactionsService
  implements IGetAccountTransactions
{
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: TransactionsRepository,
    @Inject(PAGINATE_SERVICE)
    private readonly paginateService: PaginateService,
  ) {}
  async execute(
    accountId: string,
    personId: string,
    paginationOptions?: PaginationOptionsModel,
    dateRange?: DateRangeOptions,
  ): Promise<PageModel<ITransactionModel>> {
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

    const accountTransactions =
      await this.transactionsRepository.getAccountTransactions(accountId);

    if (dateRange.startDate && dateRange.endDate) {
      const filteredAccountTransactions = accountTransactions.filter(
        transaction => {
          return (
            transaction.createdAt >= new Date(dateRange.startDate) &&
            transaction.createdAt <= new Date(dateRange.endDate)
          );
        },
      );

      const paginatedAccountTransactions = await this.paginateService.paginate(
        filteredAccountTransactions,
        paginationOptions,
      );

      return paginatedAccountTransactions;
    }

    const paginatedAccountTransactions = await this.paginateService.paginate(
      accountTransactions,
      paginationOptions,
    );

    return paginatedAccountTransactions;
  }
}
