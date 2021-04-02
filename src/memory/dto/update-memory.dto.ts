import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemoryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

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
  media?: string[];
}
