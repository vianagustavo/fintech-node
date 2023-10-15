import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ICreateCardRequestModel } from '../../domain';
import { ApiProperty } from '@nestjs/swagger';
import { CardType } from '@prisma/client';

export class CreateCardRequestDto implements ICreateCardRequestModel {
  @IsNotEmpty()
  @IsEnum(CardType)
  @ApiProperty({ enum: CardType })
  type: CardType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cvv: string;
}
