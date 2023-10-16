import { Inject, Param, Query } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { Person, PersonSessionModel } from 'src/modules/people';
import { GET_ACCOUNT_TRANSACTIONS } from 'src/modules/transactions/constants';
import { IGetAccountTransactions } from 'src/modules/transactions/domain';
import {
  GetAccountTransactions,
  GetAccountTransactionsResource,
} from '../_decorators';
import { TransactionsPageDto } from '../../dtos';
import { PaginationOptionsModel } from 'src/common/helpers';
import { DateRangeOptions } from 'src/common/helpers/date-range-options';

@GetAccountTransactionsResource()
export class GetAccountTransactionsController {
  constructor(
    @Inject(GET_ACCOUNT_TRANSACTIONS)
    private readonly getAccountTransactions: IGetAccountTransactions,
  ) {}

  @GetAccountTransactions()
  async index(
    @Param('accountId') accountId: string,
    @Query('size') size: string,
    @Query('page') page: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Person() person: PersonSessionModel,
  ): Promise<TransactionsPageDto> {
    const paginationOptions: PaginationOptionsModel = {
      size: size ? Number(size) : 4,
      page: page ? Number(page) : 1,
    };

    const dateRange: DateRangeOptions = {
      startDate,
      endDate,
    };

    const accountTransactions = await this.getAccountTransactions.execute(
      accountId,
      person.sub,
      paginationOptions,
      dateRange,
    );

    return plainToInstance(TransactionsPageDto, accountTransactions);
  }
}
