import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ChatService } from './chat.service';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from '../user/user.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/conversation')
  @UseGuards(AuthGuard('jwt'))
  getConversations(@GetUser() user: User) {
    return this.chatService.getUserConversations(user._id);
  }

  @Post('/conversation')
  @UseGuards(AuthGuard('jwt'))
  createConversation(
    @GetUser() user: User,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.chatService.createConversation(
      user._id,
      createConversationDto.users,
    );
  }

  @Post('/message')
  @UseGuards(AuthGuard('jwt'))
  sendMessage(@GetUser() user: User, @Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(user._id, sendMessageDto);
  }
}
