import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PEOPLE_REPOSITORY } from 'src/modules/people/constants';
import { compare } from 'bcrypt';

import {
  IPersonLogin,
  IPersonLoginRequestModel,
} from 'src/modules/people/domain';
import { PeopleRepository } from '../../repositories';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PersonLoginService implements IPersonLogin {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(PEOPLE_REPOSITORY)
    private readonly peopleRepository: PeopleRepository,
  ) {}
  async execute(request: IPersonLoginRequestModel): Promise<{ token: string }> {
    const formattedDocument = request.document.replace(/[-.]/g, '');
    const person = await this.peopleRepository.findPersonByDocument(
      formattedDocument,
    );

    if (!person)
      throw new BadRequestException('Document and/or password are invalid');

    const matchingPassword = await compare(request.password, person.password);

    if (!matchingPassword)
      throw new BadRequestException('Document and/or password are invalid');

    const payload = { sub: person.id, document: person.document };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
