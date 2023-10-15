import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { IAccountCardsResponseModel, ICardModel } from '../../domain';

@Expose()
export class AccountCardsResponseDto implements IAccountCardsResponseModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  branch: string;

  @ApiProperty()
  account: string;

  @ApiProperty()
  cards: ICardModel[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<AccountCardsResponseDto>) {
    Object.assign(this, partial);
  }
}
