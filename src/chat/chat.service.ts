import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation) private conversationRepo: Repository<Conversation>
  ) {}

  getUserConversations(userId) {
    return this.conversationRepo.find({
      where: {
        users: { $in: [userId] },
      }
    });
  }

  createConversation(createConversationDto: CreateConversationDto) {
    const { users } = createConversationDto;
    const conversation = this.conversationRepo.create({
      users,
      messages: [],
    });
    return this.conversationRepo.save(conversation);
  }
}
