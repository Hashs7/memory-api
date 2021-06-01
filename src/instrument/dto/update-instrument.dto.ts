import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateInstrumentDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  modelName?: string;

  /*
@ApiPropertyOptional()
image?: string;
*/

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  buyDate?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  forSale?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  type?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  specification?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  sonority?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  musicStyle?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  status?: string;
}
