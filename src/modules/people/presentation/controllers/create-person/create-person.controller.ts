import { Body, Inject } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { CreatePerson, CreatePersonResource } from '../_decorators';

import {
  ICreatePerson,
  ICreatePersonRequestModel,
} from 'src/modules/people/domain';
import { CREATE_PERSON } from 'src/modules/people/constants';
import { CreatePersonRequestDto, CreatePersonResponseDto } from '../../dtos';

@CreatePersonResource()
export class CreatePersonController {
  constructor(
    @Inject(CREATE_PERSON)
    private readonly createPerson: ICreatePerson,
  ) {}

  @CreatePerson()
  async create(
    @Body() request: CreatePersonRequestDto,
  ): Promise<CreatePersonResponseDto> {
    const person = await this.createPerson.execute(request);

    return plainToInstance(CreatePersonResponseDto, person);
  }
}
