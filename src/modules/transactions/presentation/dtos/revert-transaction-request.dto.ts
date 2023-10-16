import { ApiProperty } from '@nestjs/swagger';
import { IRevertTransactionRequestModel } from '../../domain';
import { IsNotEmpty, IsString } from 'class-validator';

export class RevertTransactionRequestModelDto
  implements IRevertTransactionRequestModel
{
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
}
