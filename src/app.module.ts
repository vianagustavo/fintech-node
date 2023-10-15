import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFile, validationSchema } from './config';
import { PeopleModule } from './modules/people/people.module';
import { CommonModule } from './common/common.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
      validationSchema,
    }),
    AccountsModule,
    CommonModule,
    PeopleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
