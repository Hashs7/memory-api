import {IsNotEmpty} from 'class-validator';
import {ObjectID} from "typeorm";

export class SendMessageDto {
  @IsNotEmpty()
  conversation: ObjectID;

  @IsNotEmpty()
  text: string;
}
