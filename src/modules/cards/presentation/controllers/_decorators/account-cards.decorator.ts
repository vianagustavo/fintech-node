import { applyDecorators, Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccountCardsResponseDto } from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function AccountCardsResource(): ClassDecorator {
  return applyDecorators(ApiTags('Cards'), Controller(RESOURCE_NAME));
}

export function GetAccountCards(): MethodDecorator {
  return applyDecorators(
    Get(':accountId/cards'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiOkResponse({
      description: 'Returns all cards from an account',
      type: AccountCardsResponseDto,
    }),
  );
}
