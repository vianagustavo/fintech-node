import { applyDecorators, Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function GetAccountBalanceResource(): ClassDecorator {
  return applyDecorators(ApiTags('Accounts'), Controller(RESOURCE_NAME));
}

export function GetAccountBalance(): MethodDecorator {
  return applyDecorators(
    Get(':accountId/balance'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiOkResponse({
      description: 'Returns account balance',
    }),
  );
}
