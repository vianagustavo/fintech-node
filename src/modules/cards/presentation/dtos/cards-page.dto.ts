import { Exclude } from 'class-transformer';
import { PageDto } from 'src/common/helpers';
import { CreateCardResponseDto } from './create-card-response.dto';

@Exclude()
export class CardsPageDto extends PageDto(CreateCardResponseDto) {
  constructor(partial: Partial<CreateCardResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
