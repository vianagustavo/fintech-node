import { Body, Inject, Param, UnauthorizedException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import {
  CreateAccountRequestModelDto,
  CreateAccountResponseDto,
} from '../../dtos';
import { CREATE_ACCOUNT } from 'src/modules/accounts/constants';
import { ICreateAccount } from 'src/modules/accounts/domain';
import { CreateAccount, CreateAccountResource } from '../_decorators';
import { Person, PersonSessionModel } from 'src/modules/people';

@CreateAccountResource()
export class CreateAccountController {
  constructor(
    @Inject(CREATE_ACCOUNT)
    private readonly createAccount: ICreateAccount,
  ) {}

  @CreateAccount()
  async create(
    @Body() request: CreateAccountRequestModelDto,
    @Param('peopleId') peopleId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateAccountResponseDto> {
    if (person.sub !== peopleId)
      throw new UnauthorizedException(
        "Payload's id doesn't match with peopleId",
      );

    const account = await this.createAccount.execute(request, peopleId);

    return plainToInstance(CreateAccountResponseDto, account);
  }
}
