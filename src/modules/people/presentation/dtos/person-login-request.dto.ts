import { IsString, IsNotEmpty } from 'class-validator';
import { IPersonLoginRequestModel } from '../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class PersonLoginRequestDto implements IPersonLoginRequestModel {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  document: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
