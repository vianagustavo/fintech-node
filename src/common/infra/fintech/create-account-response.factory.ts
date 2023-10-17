import * as faker from 'faker';
import { Factory } from 'fishery';
import { CreateAccountResponseDto } from 'src/modules/accounts/presentation';

export const createAccountResponseFactory =
  Factory.define<CreateAccountResponseDto>(() => ({
    id: faker.random.alphaNumeric(),
    account: faker.random.word(),
    branch: faker.random.word(),
    accountBalance: faker.datatype.float(),
    peopleId: faker.random.word(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }));
