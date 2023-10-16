import { applyDecorators, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTransactionRequestModelDto,
  CreateTransactionResponseDto,
} from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function CreateTransactionResource(): ClassDecorator {
  return applyDecorators(ApiTags('Transactions'), Controller(RESOURCE_NAME));
}

export function CreateTransaction(): MethodDecorator {
  return applyDecorators(
    Post(':accountId/transactions'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiBody({ type: CreateTransactionRequestModelDto }),
    ApiOkResponse({
      description: 'Creates a transaction',
      type: CreateTransactionResponseDto,
    }),
  );
}
