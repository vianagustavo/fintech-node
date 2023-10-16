import { Type as TypeFunction } from '@nestjs/common';

import { Exclude, Expose, Type } from 'class-transformer';
import { PageModel } from './paginate.service';
import { PaginationDto } from './pagination.dto';

export function PageDto<T extends TypeFunction<any> = any>(
  Resource: T,
): {
  new (...args: any[]): PageModel<T>;
} {
  @Exclude()
  class InnerPageDto<Resource> implements PageModel<Resource> {
    private type: Function;

    @Type(options => (options.newObject as InnerPageDto<Resource>).type)
    @Expose()
    data: Resource[];

    @Type(() => PaginationDto)
    @Expose()
    pagination: PaginationDto;

    constructor(partial: Partial<InnerPageDto<Resource>>) {
      this.type = Resource;
      Object.assign(this, partial);
    }
  }

  return InnerPageDto;
}
