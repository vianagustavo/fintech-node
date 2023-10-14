import { Module } from '@nestjs/common';
import {
  CREATE_PERSON,
  PEOPLE_REPOSITORY,
  PERSON_LOGIN,
  VALIDATE_DOCUMENT,
} from './constants';
import {
  DbCreatePersonService,
  PersonLoginService,
  ValidateDocument,
} from './data';
import { PrismaPeopleRepository } from './infra';
import { CreatePersonController, PersonLoginController } from './presentation';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.PEOPLE_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
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
      provide: PERSON_LOGIN,
      useClass: PersonLoginService,
    },
    {
      provide: VALIDATE_DOCUMENT,
      useClass: ValidateDocument,
    },
  ],
  controllers: [CreatePersonController, PersonLoginController],
})
export class PeopleModule {}
