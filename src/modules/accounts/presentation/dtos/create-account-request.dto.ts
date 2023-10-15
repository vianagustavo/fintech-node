import { ApiProperty } from '@nestjs/swagger';
import { ICreateAccountRequestModel } from '../../domain';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountRequestModelDto
  implements ICreateAccountRequestModel
{
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  branch: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account: string;
}
