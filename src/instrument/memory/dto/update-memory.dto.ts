import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemoryContent } from '../content/content.schema';

export class UpdateMemoryDto {
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

  @ApiProperty()
  @IsString()
  @IsOptional()
  template?: string;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    // enum: Object.values(MemoryType),
  })
  type?: string;

  @IsOptional()
  @ApiPropertyOptional({
    title: 'Array of Users ObjectId',
    example: ['606300aa1642981aa1aaaa8e'],
    type: [String],
  })
  withUsers?: string[];

  @IsOptional()
  @ApiPropertyOptional()
  contents?: MemoryContent[];
}
