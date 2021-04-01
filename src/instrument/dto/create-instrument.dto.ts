import { ApiProperty } from "@nestjs/swagger";

export class CreateInstrumentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  specification: string;
}
