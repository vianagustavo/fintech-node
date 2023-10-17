import { Test } from '@nestjs/testing';

import { CreatePersonController } from './create-person.controller';
import { ICreatePerson } from 'src/modules/people/domain';
import { CREATE_PERSON } from 'src/modules/people/constants/data/usecases';
import { factories } from 'src/common/infra';
import { plainToInstance } from 'class-transformer';
import { CreatePersonResponseDto } from '../../dtos';

describe('CreatePersonController', () => {
  const mockCreatePerson = () => ({ execute: jest.fn() });

  let sut: CreatePersonController;
  let createPerson: ICreatePerson;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreatePersonController],
      providers: [
        {
          provide: CREATE_PERSON,
          useFactory: mockCreatePerson,
        },
      ],
    }).compile();

    sut = module.get(CreatePersonController);
    createPerson = module.get(CREATE_PERSON);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call create person with correct arguments', async () => {
    const mockedRequest = factories.createPersonRequestFactory.build();
    const mockedPerson = factories.createPersonResponseFactory.build();

    jest.spyOn(createPerson, 'execute').mockResolvedValueOnce(mockedPerson);

    await sut.create(mockedRequest);

    expect(createPerson.execute).toBeCalledWith(mockedRequest);
  });

  it('should create a person', async () => {
    const mockedRequest = factories.createPersonRequestFactory.build();
    const mockedPerson = factories.createPersonResponseFactory.build();

    jest.spyOn(createPerson, 'execute').mockResolvedValueOnce(mockedPerson);

    const expectedResponse = plainToInstance(
      CreatePersonResponseDto,
      mockedPerson,
    );

    const createPersonResponse = await sut.create(mockedRequest);

    expect(createPersonResponse).toEqual(expectedResponse);
  });
});
