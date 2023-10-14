import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFile, validationSchema } from './config';
import { PeopleModule } from './modules/people/people.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
      validationSchema,
    }),
    CommonModule,
    PeopleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
