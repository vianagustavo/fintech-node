import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database';
import { PRISMA_SERVICE } from './constants';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
  exports: [PRISMA_SERVICE],
})
export class CommonModule {}
