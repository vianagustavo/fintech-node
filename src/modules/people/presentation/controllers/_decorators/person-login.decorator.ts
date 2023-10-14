import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

const RESOURCE_NAME = 'people/login';

export function PersonLoginResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function PersonLogin(): MethodDecorator {
  return applyDecorators(
    Post(),
    ApiOkResponse({
      description: 'Person login',
    }),
  );
}
