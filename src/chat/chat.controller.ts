import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ChatService } from './chat.service';
import { GetUser } from '../user/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from '../user/user.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Instrument } from '../instrument/instrument.schema';
import { Conversation } from './schema/conversation.schema';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/conversation')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Conversation],
  })
  getConversations(@GetUser() user: User): Promise<Conversation[]> {
    return this.chatService.getUserConversations(user._id);
  }

  @Post('/conversation')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [Conversation],
  })
  createConversation(
    @GetUser() user: User,
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.chatService.createConversation(
      user._id,
      createConversationDto.users,
    );
  }

  @Post('/message')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: Conversation,
  })
  sendMessage(
    @GetUser() user: User,
    @Body() sendMessageDto: SendMessageDto
  ): Promise<Conversation> {
    return this.chatService.sendMessage(user._id, sendMessageDto);
  }
}
