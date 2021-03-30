import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ObjectID, Repository } from 'typeorm';
import { Message } from './message.entity';
import { UserService } from '../user/user.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
  ) {}

  getUserConversations(userId: ObjectID) {
    return this.conversationRepo.find({
      where: {
        users: { $in: [userId] },
      },
    });
  }

  getConversation(id: ObjectID) {
    return this.conversationRepo.findOne(id);
  }

  async createConversation(sender: ObjectID, userIds: string[]) {
    const users = await this.userService.getUsers(userIds);
    console.log(userIds, users);
    const conversation = this.conversationRepo.create({
      // users: [sender, users],
      messages: [],
    });
    console.log(conversation);
    return this.conversationRepo.save(conversation);
  }

  async sendMessage(userId: ObjectID, sendMessageDto: SendMessageDto) {
    const conversation = await this.getConversation(
      sendMessageDto.conversation,
    );
    if (!conversation.messages) {
      conversation.messages = [];
    }
    conversation.messages.push(new Message(userId, sendMessageDto.text));
    return this.conversationRepo.save(conversation);
  }
}
