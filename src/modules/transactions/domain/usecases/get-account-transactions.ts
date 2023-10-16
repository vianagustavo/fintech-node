import { PageModel, PaginationOptionsModel } from 'src/common/helpers';
import { ITransactionModel } from '../models';
import { DateRangeOptions } from 'src/common/helpers/date-range-options';

export interface IGetAccountTransactions {
  execute(
    accountId: string,
    personId: string,
    paginationOptions?: PaginationOptionsModel,
    dateRange?: DateRangeOptions,
  ): Promise<PageModel<ITransactionModel>>;
}
