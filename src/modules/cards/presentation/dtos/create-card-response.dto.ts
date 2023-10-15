import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { ICardModel } from '../../domain';
import { CardType } from '@prisma/client';

@Expose()
export class CreateCardResponseDto implements ICardModel {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: CardType })
  type: CardType;

  @ApiProperty()
  number: string;

  @ApiProperty()
  cvv: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CreateCardResponseDto>) {
    Object.assign(this, partial);
  }
}
