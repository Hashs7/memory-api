import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsBoolean, IsDate, IsOptional, IsString} from 'class-validator';

export class CreateInstrumentDto {
  @IsString()
  @ApiProperty()
  brand: string;

  @IsString()
  @ApiProperty()
  modelName: string;

  @IsDate()
  @ApiProperty()
  buyDate: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image: string;

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
  @ApiProperty()
  forSale?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  type?: string;

  @IsString()
  @ApiProperty()
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
