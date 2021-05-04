import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInstrumentDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  /*
  @ApiPropertyOptional()
  image?: string;
  */

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  brand?: string;

  @ApiPropertyOptional()
  modelName?: string;

  @ApiPropertyOptional()
  specification?: string;

  @ApiPropertyOptional()
  buyDate?: Date;
}
