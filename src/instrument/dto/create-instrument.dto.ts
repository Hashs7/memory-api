import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateInstrumentDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  image?: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  brand: string;

  @ApiPropertyOptional()
  modelName?: string;

  @ApiProperty()
  specification: string;

  @ApiPropertyOptional()
  buyDate?: Date;
}
