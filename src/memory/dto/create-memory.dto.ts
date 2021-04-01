import { ApiProperty } from '@nestjs/swagger';
import { MemoryType } from '../memory.schema';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemoryDto {
  @IsString()
  @ApiProperty({
    title: 'Instrument shortId',
    example: '7GGGh00K',
    type: String,
  })
  instrument: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  // @IsEnum(MemoryType)
  @ApiProperty({
    // enum: Object.values(MemoryType),
  })
  type: string;

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
  media?: string[];
}
