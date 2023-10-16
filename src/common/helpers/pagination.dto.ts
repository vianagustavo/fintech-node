import { Exclude, Expose } from 'class-transformer';
import { PaginationModel } from './paginate.service';

@Exclude()
export class PaginationDto implements PaginationModel {
  @Expose()
  itemsPerPage: number;

  @Expose()
  currentPage: number;

  constructor(partial: Partial<PaginationDto>) {
    Object.assign(this, partial);
  }
}
