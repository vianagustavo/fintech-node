import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonLoginRequestDto } from '../../dtos';

const RESOURCE_NAME = 'people/login';

export function PersonLoginResource(): ClassDecorator {
  return applyDecorators(ApiTags('People'), Controller(RESOURCE_NAME));
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
