import { applyDecorators, Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTransactionRequestModelDto,
  TransactionsPageDto,
} from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function GetAccountTransactionsResource(): ClassDecorator {
  return applyDecorators(ApiTags('Transactions'), Controller(RESOURCE_NAME));
}

export function GetAccountTransactions(): MethodDecorator {
  return applyDecorators(
    Get(':accountId/transactions'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiQuery({
      name: 'size',
      required: false,
      type: 'string',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: 'string',
    }),
    ApiQuery({
      name: 'startDate',
      required: false,
      type: 'date',
    }),
    ApiQuery({
      name: 'endDate',
      required: false,
      type: 'date',
    }),
    ApiBody({ type: CreateTransactionRequestModelDto }),
    ApiOkResponse({
      description: 'Returns account transactions with pagination',
      type: TransactionsPageDto,
    }),
  );
}
