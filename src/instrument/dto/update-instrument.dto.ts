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
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  /*
  @ApiPropertyOptional()
  image?: string;
  */

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  type?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  modelName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  specification?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  forSale?: boolean;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  buyDate?: Date;
}
