import { applyDecorators, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTransactionResponseDto,
  RevertTransactionRequestModelDto,
} from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function RevertTransactionResource(): ClassDecorator {
  return applyDecorators(ApiTags('Transactions'), Controller(RESOURCE_NAME));
}

export function RevertTransaction(): MethodDecorator {
  return applyDecorators(
    Post(':accountId/transactions/:transactionId/revert'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiParam({
      name: 'transactionId',
      required: true,
      type: 'string',
    }),
    ApiBody({ type: RevertTransactionRequestModelDto }),
    ApiOkResponse({
      description: 'Reverts a transaction and updates account balance',
      type: CreateTransactionResponseDto,
    }),
  );
}
