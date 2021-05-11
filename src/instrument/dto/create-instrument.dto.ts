import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateInstrumentDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  type: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  brand: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  modelName?: string;

  @IsString()
  @ApiProperty()
  specification: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  forSale?: boolean;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  buyDate?: Date;
}
