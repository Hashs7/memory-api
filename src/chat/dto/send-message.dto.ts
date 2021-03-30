import { IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  conversation: string;

  @IsNotEmpty()
  text: string;
}
