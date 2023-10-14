import { Module } from '@nestjs/common';
import {
  CREATE_PERSON,
  PEOPLE_REPOSITORY,
  VALIDATE_DOCUMENT,
} from './constants';
import { DbCreatePersonService, ValidateDocument } from './data';
import { PrismaPeopleRepository } from './infra';
import { CreatePersonController } from './presentation';

@Module({
  imports: [],
  providers: [
    {
      provide: CREATE_PERSON,
      useClass: DbCreatePersonService,
    },
    {
      provide: PEOPLE_REPOSITORY,
      useClass: PrismaPeopleRepository,
    },
    {
      provide: VALIDATE_DOCUMENT,
      useClass: ValidateDocument,
    },
  ],
  controllers: [CreatePersonController],
})
export class PeopleModule {}
