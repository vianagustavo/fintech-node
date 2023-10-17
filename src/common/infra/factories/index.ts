import * as faker from 'faker';
import {
  createAccountRequestFactory,
  createAccountResponseFactory,
  createMockToken,
  createPersonRequestFactory,
  createPersonResponseFactory,
  personLoginRequestFactory,
  personSessionFactory,
} from '../fintech';

export const factories = {
  faker,
  createAccountRequestFactory,
  createAccountResponseFactory,
  createPersonRequestFactory,
  createPersonResponseFactory,
  personLoginRequestFactory,
  personSessionFactory,
  createMockToken,
};
