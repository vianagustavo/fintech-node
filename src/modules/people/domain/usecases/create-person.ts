import { ICreatePersonRequestModel, IPeopleModel } from '../models';

export interface ICreatePerson {
  execute(request: ICreatePersonRequestModel): Promise<IPeopleModel>;
}
