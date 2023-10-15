import { ICreatePersonRequestModel, IPeopleModel } from '../../domain/models';

export interface PeopleRepository {
  createPerson(request: ICreatePersonRequestModel): Promise<IPeopleModel>;
  findPersonByDocument(document: string): Promise<IPeopleModel | null>;
  findPersonById(id: string): Promise<IPeopleModel | null>;
}
