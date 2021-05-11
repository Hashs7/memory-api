import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
  IsOptional,
  Length,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @ApiProperty({
    minimum: 4,
    maximum: 32,
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    minimum: 2,
    maximum: 20,
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    minimum: 4,
    maximum: 20,
  })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'email@example.com',
  })
  email?: string;

  @IsPhoneNumber('FR')
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;

  @IsOptional()
  @ApiPropertyOptional()
  isOnline: boolean;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional()
  whistList?: string[];

  @IsOptional()
  @ApiPropertyOptional()
  image?: string;
}
