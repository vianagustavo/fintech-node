import { IsString, IsNotEmpty } from 'class-validator';
import { ICreatePersonRequestModel } from '../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonRequestDto implements ICreatePersonRequestModel {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  document: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
