import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CreateOldownerDto,
  CreateOldownerUserDto,
} from '../oldowner/dto/create-oldowner.dto';

export class CreateInstrumentDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  brand: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  modelName?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  buyDate?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

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
  @IsOptional()
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

  @IsOptional()
  @ApiProperty()
  oldOwnersUser?: CreateOldownerUserDto[];

  @IsOptional()
  @ApiProperty()
  oldOwners?: CreateOldownerDto[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  colors?: string[];
}
