import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

import { ITransactionModel } from '../../domain';

@Expose()
export class CreateTransactionResponseDto implements ITransactionModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  description: string;

  @Exclude()
  accountId: string;

  @Exclude()
  revertedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CreateTransactionResponseDto>) {
    Object.assign(this, partial);
  }
}
