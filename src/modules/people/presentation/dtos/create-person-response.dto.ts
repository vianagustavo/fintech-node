import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

import { IPeopleModel } from '../../domain';

@Expose()
export class CreatePersonResponseDto implements IPeopleModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CreatePersonResponseDto>) {
    Object.assign(this, partial);
  }
}
