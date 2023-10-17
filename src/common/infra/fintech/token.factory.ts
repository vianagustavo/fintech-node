import * as jwt from 'jsonwebtoken';
import { PersonSessionModel } from 'src/modules/people';

const mockJwtSecret = process.env.PEOPLE_SECRET;
export const createMockToken = (claims: PersonSessionModel) =>
  jwt.sign(claims, mockJwtSecret);
