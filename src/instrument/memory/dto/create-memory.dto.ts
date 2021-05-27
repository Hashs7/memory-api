import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {MemoryContent} from '../content/content.schema';
import {MemoryVisibility} from "../memory.schema";

export class CreateMemoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  template?: string;

  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsOptional()
  @IsString()
  // @IsEnum(MemoryType)
  @ApiProperty({
    // enum: Object.values(MemoryType),
  })
  type?: string;

  @IsOptional()
  @IsString()
  @IsEnum(MemoryVisibility)
  @ApiPropertyOptional({
    enum: Object.values(MemoryVisibility),
  })
  visibility?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'User ObjectId',
    example: '606300aa1642981aa1aaaa8e',
    type: String,
  })
  createdBy: string;

  @IsOptional()
  @ApiProperty({
    title: 'Array of Users ObjectId',
    example: ['606300aa1642981aa1aaaa8e'],
    type: [String],
  })
  withUsers?: string[];

  @IsOptional()
  @ApiProperty()
  contents?: MemoryContent[];
}
