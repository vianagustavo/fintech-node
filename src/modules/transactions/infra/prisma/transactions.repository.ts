import { Inject, Injectable } from '@nestjs/common';

import { TransactionsRepository } from '../../data';
import { PrismaService } from 'src/common/database';
import { PRISMA_SERVICE } from 'src/common/constants';
import {
  ICreateTransactionRequestModel,
  ITransactionModel,
} from '../../domain';

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createTransaction(
    request: ICreateTransactionRequestModel,
    accountId: string,
    updatedBalance: number,
  ): Promise<ITransactionModel> {
    const [transaction] = await this.prismaService.$transaction([
      this.prismaService.transaction.create({
        data: {
          value: request.value,
          description: request.description,
          accountId,
        },
      }),
      this.prismaService.account.update({
        where: {
          id: accountId,
        },
        data: {
          accountBalance: updatedBalance,
        },
      }),
    ]);

    return transaction;
  }

  async getAccountTransactions(
    accountId: string,
  ): Promise<ITransactionModel[]> {
    const accountTransactions = await this.prismaService.transaction.findMany({
      where: {
        accountId,
      },
    });

    return accountTransactions;
  }

  async findTransactionById(transactionId: string): Promise<ITransactionModel> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    return transaction;
  }

  async revertTransaction(
    transactionId: string,
    accountId: string,
    updatedBalance: number,
  ): Promise<boolean> {
    await this.prismaService.$transaction([
      this.prismaService.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          revertedAt: new Date(),
        },
      }),
      this.prismaService.account.update({
        where: {
          id: accountId,
        },
        data: {
          accountBalance: updatedBalance,
        },
      }),
    ]);

    return true;
  }
}
