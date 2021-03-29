import { IsArray, MinLength } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @MinLength(2)
  users: string[]
}
