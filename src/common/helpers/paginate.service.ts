export interface PaginationModel {
  itemsPerPage: number;
  currentPage: number;
}

export interface PaginationOptionsModel {
  size: number;
  page: number;
}

export interface PageModel<DataT = any> {
  data: DataT[];
  pagination: PaginationModel;
}

export class PaginateService<TDataType = any> {
  async paginate(
    data: TDataType[],
    paginationOptions: PaginationOptionsModel,
  ): Promise<PageModel<TDataType>> {
    const { page, size } = paginationOptions;

    const elementToStartCut = page * size - size;
    const lastElementToDisplay = page * size;

    const paginatedData = data.slice(elementToStartCut, lastElementToDisplay);

    const paginatedObject: PageModel = {
      data: paginatedData,
      pagination: {
        itemsPerPage: size,
        currentPage: page,
      },
    };

    return paginatedObject;
  }
}
