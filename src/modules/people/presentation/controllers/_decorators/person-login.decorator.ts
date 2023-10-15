import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonLoginRequestDto } from '../../dtos';

const RESOURCE_NAME = 'people/login';

export function PersonLoginResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function PersonLogin(): MethodDecorator {
  return applyDecorators(
    Post(),
    ApiBody({ type: PersonLoginRequestDto }),
    ApiOkResponse({
      description: 'Person login',
    }),
  );
}
