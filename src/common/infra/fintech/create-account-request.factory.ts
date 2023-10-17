import * as faker from 'faker';
import { Factory } from 'fishery';
import { ICreateAccountRequestModel } from 'src/modules/accounts/domain';

export const createAccountRequestFactory =
  Factory.define<ICreateAccountRequestModel>(() => ({
    account: faker.random.word(),
    branch: faker.random.word(),
  }));
