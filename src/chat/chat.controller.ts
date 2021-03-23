import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ChatService } from './chat.service';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService
  ) {}

  @Get('/')
  getConversations(
    @GetUser() user: User,
  ) {
    return this.chatService.getUserConversations(user.id);
  }

  @Post('/conversation')
  createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.chatService.createConversation(createConversationDto);
  }

  @Post('/message')
  sendMessage() {}
}
