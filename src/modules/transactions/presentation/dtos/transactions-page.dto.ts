import { Exclude } from 'class-transformer';
import { PageDto } from 'src/common/helpers';
import { CreateTransactionResponseDto } from './create-transaction-response.dto';

@Exclude()
export class TransactionsPageDto extends PageDto(CreateTransactionResponseDto) {
  constructor(partial: Partial<CreateTransactionResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
