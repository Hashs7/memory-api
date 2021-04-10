import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResetDto {
  @IsString()
  @MinLength(32)
  @MaxLength(70)
  @ApiProperty({
    minimum: 32,
    maximum: 70,
    title: 'Reset token',
    // example: 'user@example.com',
  })
  token: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is too weak'}
  )
  @ApiProperty({
    minimum: 8,
    pattern: "/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/"
  })
  password: string;
}
