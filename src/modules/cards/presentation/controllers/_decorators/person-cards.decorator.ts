import { applyDecorators, Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'people';

export function PersonCardsResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function GetPersonCards(): MethodDecorator {
  return applyDecorators(
    Get(':peopleId/cards'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'peopleId',
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
    ApiOkResponse({
      description: 'Returns all cards from a person',
    }),
  );
}
