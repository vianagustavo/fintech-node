import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database';
import { PAGINATE_SERVICE, PRISMA_SERVICE } from './constants';
import { PaginateService } from './helpers';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PAGINATE_SERVICE,
      useClass: PaginateService,
    },
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
  exports: [PRISMA_SERVICE, PAGINATE_SERVICE],
})
export class CommonModule {}
