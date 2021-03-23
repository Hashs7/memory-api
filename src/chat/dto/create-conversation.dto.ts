import { IsArray, MinLength } from 'class-validator';
import { User } from '../../user/user.entity';

export class CreateConversationDto {
  @IsArray()
  @MinLength(2)
  users: User[]
}