import { PartialType } from '@nestjs/mapped-types';
import { CreateInstrumentDto } from './create-instrument.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInstrumentDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  specification?: string;
}
