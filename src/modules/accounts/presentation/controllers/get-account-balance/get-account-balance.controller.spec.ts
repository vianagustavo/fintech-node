import { Test, TestingModule } from '@nestjs/testing';
import { IGetAccountBalance } from 'src/modules/accounts/domain';
import { GET_ACCOUNT_BALANCE } from 'src/modules/accounts/constants';
import { JwtService } from '@nestjs/jwt';
import { factories } from 'src/common/infra';
import { GetAccountBalanceController } from './get-account-balance.controller';

describe('GetAccountBalanceController', () => {
  const mockGetAccountBalance = () => ({ execute: jest.fn() });

  let sut: GetAccountBalanceController;
  let getAccountBalance: IGetAccountBalance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountBalanceController],
      providers: [
        {
          provide: GET_ACCOUNT_BALANCE,
          useFactory: mockGetAccountBalance,
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

    sut = module.get(GetAccountBalanceController);
    getAccountBalance = module.get(GET_ACCOUNT_BALANCE);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call getAccountBalance with correct arguments', async () => {
    const accountId = factories.faker.random.alphaNumeric();
    const mockedPerson = {
      sub: factories.faker.random.alphaNumeric(),
      document: factories.faker.random.alphaNumeric(),
    };
    const mockedBalance = factories.faker.datatype.float();

    jest
      .spyOn(getAccountBalance, 'execute')
      .mockResolvedValueOnce({ balance: mockedBalance });

    await sut.index(accountId, mockedPerson);

    expect(getAccountBalance.execute).toBeCalledTimes(1);
    expect(getAccountBalance.execute).toBeCalledWith(
      accountId,
      mockedPerson.sub,
    );
  });

  it('should return person accounts', async () => {
    const accountId = factories.faker.random.alphaNumeric();
    const mockedPerson = {
      sub: factories.faker.random.alphaNumeric(),
      document: factories.faker.random.alphaNumeric(),
    };
    const mockedBalance = factories.faker.datatype.float();

    jest
      .spyOn(getAccountBalance, 'execute')
      .mockResolvedValueOnce({ balance: mockedBalance });

    const response = await sut.index(accountId, mockedPerson);

    expect(response).toEqual({ balance: mockedBalance });
  });
});
