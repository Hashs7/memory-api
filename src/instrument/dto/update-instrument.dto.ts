import { PartialType } from '@nestjs/mapped-types';
import { CreateInstrumentDto } from './create-instrument.dto';

// export class UpdateInstrumentDto extends PartialType(CreateInstrumentDto) {}
export class UpdateInstrumentDto {
  id?: string;

  name?: string;

  type?: string;

  specification?: string;
}
