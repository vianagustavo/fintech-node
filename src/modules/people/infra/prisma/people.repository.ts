import { Inject, Injectable } from '@nestjs/common';

import { PeopleRepository } from '../../data';
import { PrismaService } from 'src/common/database';
import { PRISMA_SERVICE } from 'src/common/constants';
import { ICreatePersonRequestModel, IPeopleModel } from '../../domain';

@Injectable()
export class PrismaPeopleRepository implements PeopleRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createPerson(
    request: ICreatePersonRequestModel,
  ): Promise<IPeopleModel> {
    const person = await this.prismaService.people.create({
      data: request,
    });

    return person;
  }

  async findPersonByDocument(document: string): Promise<IPeopleModel | null> {
    const person = await this.prismaService.people.findFirst({
      where: {
        document,
      },
    });

    return person;
  }

  async findPersonById(id: string): Promise<IPeopleModel> {
    const person = await this.prismaService.people.findUnique({
      where: {
        id,
      },
    });

    return person;
  }
}
