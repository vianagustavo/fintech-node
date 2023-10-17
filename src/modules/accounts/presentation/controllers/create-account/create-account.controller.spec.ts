import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from './create-account.controller';
import { ICreateAccount } from 'src/modules/accounts/domain';
import { CREATE_ACCOUNT } from 'src/modules/accounts/constants';
import { CreateAccountRequestModelDto } from '../../dtos';
import { factories } from 'src/common/infra';
import { JwtService } from '@nestjs/jwt';

describe('CreateAccountController', () => {
  const mockCreateAccount = () => ({ execute: jest.fn() });

  let sut: CreateAccountController;
  let createAccount: ICreateAccount;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
      providers: [
        {
          provide: CREATE_ACCOUNT,
          useFactory: mockCreateAccount,
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

    sut = module.get(CreateAccountController);
    createAccount = module.get(CREATE_ACCOUNT);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create an account with valid JWT', async () => {
    const createAccountRequest: CreateAccountRequestModelDto =
      factories.createAccountRequestFactory.build();
    const createAccountResponse =
      factories.createAccountResponseFactory.build();

    const peopleId = factories.faker.random.alphaNumeric();

    jest
      .spyOn(createAccount, 'execute')
      .mockResolvedValueOnce(createAccountResponse);

    const response = await sut.create(createAccountRequest, peopleId, {
      document: factories.faker.random.alphaNumeric(),
      sub: peopleId,
    });

    const responseObj = {
      id: createAccountResponse.id,
      account: createAccountResponse.account,
      branch: createAccountResponse.branch,
      createdAt: createAccountResponse.createdAt,
      updatedAt: createAccountResponse.updatedAt,
    };

    expect(createAccount.execute).toHaveBeenCalledWith(
      createAccountRequest,
      peopleId,
    );
    expect(response).toEqual(responseObj);
  });
});
