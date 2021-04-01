import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'Conversation ObjectId',
  })
  conversation: string;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
