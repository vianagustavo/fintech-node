import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PEOPLE_REPOSITORY,
  VALIDATE_DOCUMENT,
} from 'src/modules/people/constants';
import { hash } from 'bcrypt';

import {
  ICreatePerson,
  ICreatePersonRequestModel,
  IPeopleModel,
} from 'src/modules/people/domain';
import { PeopleRepository } from '../../repositories';
import { ValidateDocument } from '../../helpers';

@Injectable()
export class DbCreatePersonService implements ICreatePerson {
  constructor(
    @Inject(PEOPLE_REPOSITORY)
    private readonly peopleRepository: PeopleRepository,
    @Inject(VALIDATE_DOCUMENT)
    private readonly validateDocument: ValidateDocument,
  ) {}
  async execute(request: ICreatePersonRequestModel): Promise<IPeopleModel> {
    const validDocument = this.validateDocument.execute(request.document);

    if (!validDocument)
      throw new BadRequestException('Provided document is invalid');

    const existingDocument = await this.peopleRepository.findPersonByDocument(
      request.document,
    );

    if (existingDocument) {
      throw new BadRequestException('Document has already been registered');
    }

    const hashedPassword = await hash(request.password, 10);
    const formattedDocument = request.document.replace(/[-.]/g, '');

    const personToCreate: ICreatePersonRequestModel = {
      document: formattedDocument,
      name: request.name,
      password: hashedPassword,
    };

    const person = await this.peopleRepository.createPerson(personToCreate);

    return person;
  }
}
