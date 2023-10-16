import { Body, Inject, Param } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { Person, PersonSessionModel } from 'src/modules/people';
import { CREATE_TRANSACTION } from 'src/modules/transactions/constants';
import { ICreateTransaction } from 'src/modules/transactions/domain';
import { CreateTransaction, CreateTransactionResource } from '../_decorators';
import {
  CreateTransactionRequestModelDto,
  CreateTransactionResponseDto,
} from '../../dtos';

@CreateTransactionResource()
export class CreateTransactionController {
  constructor(
    @Inject(CREATE_TRANSACTION)
    private readonly createTransaction: ICreateTransaction,
  ) {}

  @CreateTransaction()
  async create(
    @Body() request: CreateTransactionRequestModelDto,
    @Param('accountId') accountId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateTransactionResponseDto> {
    const transaction = await this.createTransaction.execute(
      request,
      accountId,
      person.sub,
    );

    return plainToInstance(CreateTransactionResponseDto, transaction);
  }
}
