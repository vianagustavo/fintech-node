import { applyDecorators, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from '../../dtos';
import { AuthGuard } from 'src/modules/people/guards';

const RESOURCE_NAME = 'people';

export function CreatePersonResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function CreatePerson(): MethodDecorator {
  return applyDecorators(
    Post(),
    ApiOkResponse({
      description: 'Creates a person',
      type: CreatePersonDto,
    }),
  );
}
