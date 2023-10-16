import { applyDecorators, Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAccountRequestModelDto,
  CreateAccountResponseDto,
} from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'people';

export function GetPersonAccountsResource(): ClassDecorator {
  return applyDecorators(ApiTags('Accounts'), Controller(RESOURCE_NAME));
}

export function GetPersonAccounts(): MethodDecorator {
  return applyDecorators(
    Get(':peopleId/accounts'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'peopleId',
      required: true,
      type: 'string',
    }),
    ApiBody({ type: [CreateAccountRequestModelDto] }),
    ApiOkResponse({
      description: 'Returns all accounts of a person',
      type: CreateAccountResponseDto,
    }),
  );
}
