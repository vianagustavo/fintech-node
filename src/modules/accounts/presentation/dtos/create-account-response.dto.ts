import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

import { IAccountsModel } from '../../domain';

@Expose()
export class CreateAccountResponseDto implements IAccountsModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  branch: string;

  @ApiProperty()
  account: string;

  @Exclude()
  accountBalance: number;

  @Exclude()
  peopleId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CreateAccountResponseDto>) {
    Object.assign(this, partial);
  }
}
