import {
  applyDecorators,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

export function CreateAccountResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function CreateAccount(): MethodDecorator {
  return applyDecorators(
    Post(':peopleId/accounts'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'peopleId',
      required: true,
      type: 'string',
    }),
    ApiBody({ type: CreateAccountRequestModelDto }),
    ApiOkResponse({
      description: 'Creates an account',
      type: CreateAccountResponseDto,
    }),
  );
}
