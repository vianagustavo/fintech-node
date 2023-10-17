import * as faker from 'faker';
import { Factory } from 'fishery';
import { PersonSessionModel } from 'src/modules/people/domain';

export const personSessionFactory = Factory.define<PersonSessionModel>(() => ({
  sub: faker.random.word(),
  document: faker.random.word(),
}));
