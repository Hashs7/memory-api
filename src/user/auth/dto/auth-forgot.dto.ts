import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthForgotDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    minimum: 4,
    maximum: 20,
    title: 'Username or email',
    example: 'user@example.com',
  })
  username: string;
}
