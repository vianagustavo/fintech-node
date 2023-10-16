import { applyDecorators, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCardRequestDto, CreateCardResponseDto } from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'accounts';

export function CreateCardResource(): ClassDecorator {
  return applyDecorators(ApiTags('Cards'), Controller(RESOURCE_NAME));
}

export function CreateCard(): MethodDecorator {
  return applyDecorators(
    Post(':accountId/cards'),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiParam({
      name: 'accountId',
      required: true,
      type: 'string',
    }),
    ApiBody({ type: CreateCardRequestDto }),
    ApiOkResponse({
      description: 'Creates a card',
      type: CreateCardResponseDto,
    }),
  );
}
