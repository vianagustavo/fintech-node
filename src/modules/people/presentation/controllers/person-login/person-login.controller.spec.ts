import { Test } from '@nestjs/testing';

import { IPersonLogin } from 'src/modules/people/domain';
import { PERSON_LOGIN } from 'src/modules/people/constants/data/usecases';
import { factories } from 'src/common/infra';
import { plainToInstance } from 'class-transformer';
import { CreatePersonResponseDto } from '../../dtos';
import { PersonLoginController } from './person-login.controller';

describe('PersonLoginController', () => {
  const mockPersonLogin = () => ({ execute: jest.fn() });

  let sut: PersonLoginController;
  let personLogin: IPersonLogin;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PersonLoginController],
      providers: [
        {
          provide: PERSON_LOGIN,
          useFactory: mockPersonLogin,
        },
      ],
    }).compile();

    sut = module.get(PersonLoginController);
    personLogin = module.get(PERSON_LOGIN);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call person login with correct arguments', async () => {
    const mockedRequest = factories.personLoginRequestFactory.build();

    jest
      .spyOn(personLogin, 'execute')
      .mockResolvedValueOnce({ token: factories.faker.random.word() });

    await sut.login(mockedRequest);

    expect(personLogin.execute).toBeCalledTimes(1);
    expect(personLogin.execute).toBeCalledWith(mockedRequest);
  });

  it('should login a person and return token', async () => {
    const mockedRequest = factories.personLoginRequestFactory.build();
    const mockedToken = factories.faker.random.word();

    jest
      .spyOn(personLogin, 'execute')
      .mockResolvedValueOnce({ token: mockedToken });

    const response = await sut.login(mockedRequest);

    expect(response).toEqual({ token: mockedToken });
  });
});
