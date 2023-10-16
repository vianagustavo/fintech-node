import { ApiProperty } from '@nestjs/swagger';
import { ICreateTransactionRequestModel } from '../../domain';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionRequestModelDto
  implements ICreateTransactionRequestModel
{
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  value: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
}
