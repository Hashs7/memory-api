import { IsArray, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.schema';

export class CreateConversationDto {
  @IsArray()
  @MinLength(2)
  @ApiProperty({
    title: 'Array of Users ObjectId',
  })
  users: string[]
}
