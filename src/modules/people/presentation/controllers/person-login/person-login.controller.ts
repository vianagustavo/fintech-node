import { Body, Inject } from '@nestjs/common';

import { PersonLogin, PersonLoginResource } from '../_decorators';

import { IPersonLogin } from 'src/modules/people/domain';
import { PERSON_LOGIN } from 'src/modules/people/constants';
import { PersonLoginRequestDto } from '../../dtos';

@PersonLoginResource()
export class PersonLoginController {
  constructor(
    @Inject(PERSON_LOGIN)
    private readonly personLogin: IPersonLogin,
  ) {}

  @PersonLogin()
  async login(
    @Body() request: PersonLoginRequestDto,
  ): Promise<{ token: string }> {
    const token = await this.personLogin.execute(request);

    return token;
  }
}
