import { Controller, Get, Post } from '@nestjs/common';

@Controller('chat')
export class ChatController {

  @Get('/')
  getConversations() {}

  @Post('/message')
  sendMessage() {}
}
