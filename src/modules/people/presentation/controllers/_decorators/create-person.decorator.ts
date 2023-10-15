import { applyDecorators, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonRequestDto, CreatePersonResponseDto } from '../../dtos';

const RESOURCE_NAME = 'people';

export function CreatePersonResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function CreatePerson(): MethodDecorator {
  return applyDecorators(
    Post(),
    ApiBody({ type: CreatePersonRequestDto }),
    ApiOkResponse({
      description: 'Creates a person',
      type: CreatePersonResponseDto,
    }),
  );
}
