import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../user/user.schema';

export interface InterfaceOldownerUser {
  user: User;

  from: Date;

  to: Date;
}

export class CreateOldownerUserDto {
  @IsOptional()
  @ApiProperty({
    title: 'User ObjectId',
    example: '606300aa1642981aa1aaaa8e',
    type: String,
  })
  user?: string;

  @IsString()
  @ApiProperty()
  from: Date;

  @IsString()
  @ApiProperty()
  to: Date;
}

export class CreateOldownerDto {
  @IsOptional()
  @ApiProperty()
  user: {
    firstName?: string;
    lastName?: string;
  };

  @IsString()
  @ApiProperty()
  from: Date;

  @IsString()
  @ApiProperty()
  to: Date;
}
