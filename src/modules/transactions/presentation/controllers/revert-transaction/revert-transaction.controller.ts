import { Body, Inject, Param } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { Person, PersonSessionModel } from 'src/modules/people';
import { REVERT_TRANSACTION } from 'src/modules/transactions/constants';
import { IRevertTransaction } from 'src/modules/transactions/domain';
import { RevertTransaction, RevertTransactionResource } from '../_decorators';
import {
  CreateTransactionResponseDto,
  RevertTransactionRequestModelDto,
} from '../../dtos';

@RevertTransactionResource()
export class RevertTransactionController {
  constructor(
    @Inject(REVERT_TRANSACTION)
    private readonly revertTransaction: IRevertTransaction,
  ) {}

  @RevertTransaction()
  async index(
    @Body() request: RevertTransactionRequestModelDto,
    @Param('accountId') accountId: string,
    @Param('transactionId') transactionId: string,
    @Person() person: PersonSessionModel,
  ): Promise<CreateTransactionResponseDto> {
    const transaction = await this.revertTransaction.execute(
      request,
      transactionId,
      accountId,
      person.sub,
    );

    return plainToInstance(CreateTransactionResponseDto, transaction);
  }
}
