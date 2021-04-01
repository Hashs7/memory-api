import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'Conversation ObjectId',
    example: '606300aa1642981aa1aaaa8e',
    type: String,
  })
  conversation: string;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
