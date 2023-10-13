import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFile, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
