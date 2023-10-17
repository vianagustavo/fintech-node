import * as faker from 'faker';
import { Factory } from 'fishery';
import { IPersonLoginRequestModel } from 'src/modules/people/domain';

export const personLoginRequestFactory =
  Factory.define<IPersonLoginRequestModel>(() => ({
    document: faker.random.word(),
    password: faker.random.word(),
  }));
