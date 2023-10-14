import { Body, Inject } from '@nestjs/common';

import { PersonLogin, PersonLoginResource } from '../_decorators';

import {
  IPersonLogin,
  IPersonLoginRequestModel,
} from 'src/modules/people/domain';
import { PERSON_LOGIN } from 'src/modules/people/constants';

@PersonLoginResource()
export class PersonLoginController {
  constructor(
    @Inject(PERSON_LOGIN)
    private readonly personLogin: IPersonLogin,
  ) {}

  @PersonLogin()
  async login(
    @Body() request: IPersonLoginRequestModel,
  ): Promise<{ token: string }> {
    const token = await this.personLogin.execute(request);

    return token;
  }
}
