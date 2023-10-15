import { PageModel, PaginationOptionsModel } from 'src/common/helpers';
import { ICardModel } from '../models';

export interface IGetPersonCards {
  execute(
    personId: string,
    paginationOptions: PaginationOptionsModel,
  ): Promise<PageModel<ICardModel>>;
}
