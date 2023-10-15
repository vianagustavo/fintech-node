import { Inject, Injectable } from '@nestjs/common';

import { AccountsRepository } from '../../data';
import { PrismaService } from 'src/common/database';
import { PRISMA_SERVICE } from 'src/common/constants';
import { IAccountsModel, ICreateAccountRequestModel } from '../../domain';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createAccount(
    request: ICreateAccountRequestModel,
    peopleId: string,
  ): Promise<IAccountsModel> {
    const account = await this.prismaService.account.create({
      data: {
        branch: request.branch,
        account: request.account,
        accountBalance: 0,
        peopleId,
      },
    });

    return account;
  }

  async findAccountByNumberAndBranch(
    data: ICreateAccountRequestModel,
  ): Promise<IAccountsModel | null> {
    const account = await this.prismaService.account.findFirst({
      where: {
        account: data.account,
        branch: data.branch,
      },
    });

    return account;
  }

  async findAccountsByPersonId(personId: string): Promise<IAccountsModel[]> {
    const accounts = await this.prismaService.account.findMany({
      where: {
        peopleId: personId,
      },
    });

    return accounts;
  }
}
