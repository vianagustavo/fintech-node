import * as faker from 'faker';
import { Factory } from 'fishery';
import { CreatePersonResponseDto } from 'src/modules/people';

export const createPersonResponseFactory =
  Factory.define<CreatePersonResponseDto>(() => ({
    id: faker.random.alphaNumeric(),
    document: faker.random.word(),
    name: faker.random.word(),
    password: faker.random.word(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }));
