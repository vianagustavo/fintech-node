import * as faker from 'faker';
import { Factory } from 'fishery';
import { ICreatePersonRequestModel } from 'src/modules/people';

export const createPersonRequestFactory =
  Factory.define<ICreatePersonRequestModel>(() => ({
    document: faker.random.word(),
    name: faker.random.word(),
    password: faker.random.word(),
  }));
