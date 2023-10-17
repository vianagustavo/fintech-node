import { Test, TestingModule } from '@nestjs/testing';
import { IGetPersonAccounts } from 'src/modules/accounts/domain';
import { GET_PERSON_ACCOUNTS } from 'src/modules/accounts/constants';
import { JwtService } from '@nestjs/jwt';
import { GetPersonAccountsController } from './get-person-accounts.controller';
import { factories } from 'src/common/infra';

describe('GetPersonAccountsController', () => {
  const mockGetPersonAccounts = () => ({ execute: jest.fn() });

  let sut: GetPersonAccountsController;
  let getPersonAccounts: IGetPersonAccounts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPersonAccountsController],
      providers: [
        {
          provide: GET_PERSON_ACCOUNTS,
          useFactory: mockGetPersonAccounts,
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get(GetPersonAccountsController);
    getPersonAccounts = module.get(GET_PERSON_ACCOUNTS);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call getPersonAccounts with correct arguments', async () => {
    const peopleId = factories.faker.random.alphaNumeric();
    const mockedPerson = {
      sub: peopleId,
      document: factories.faker.random.alphaNumeric(),
    };

    jest.spyOn(getPersonAccounts, 'execute').mockResolvedValueOnce([]);

    await sut.index(peopleId, mockedPerson);

    expect(getPersonAccounts.execute).toBeCalledTimes(1);
    expect(getPersonAccounts.execute).toBeCalledWith(peopleId);
  });

  it('should return person accounts', async () => {
    const peopleId = factories.faker.random.alphaNumeric();
    const mockedPerson = {
      sub: peopleId,
      document: factories.faker.random.alphaNumeric(),
    };
    const mockedLength = factories.faker.datatype.number({ min: 1, max: 5 });
    const mockedAccounts =
      factories.createAccountResponseFactory.buildList(mockedLength);

    jest
      .spyOn(getPersonAccounts, 'execute')
      .mockResolvedValueOnce(mockedAccounts);

    const response = await sut.index(peopleId, mockedPerson);

    const parsedMockedAccounts = mockedAccounts.map(account => {
      return {
        id: account.id,
        account: account.account,
        branch: account.branch,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      };
    });

    expect(response).toEqual(parsedMockedAccounts);
  });
});
