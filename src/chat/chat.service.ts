import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ObjectID, Repository } from 'typeorm';
import { Message } from './message.entity';
import { UserService } from '../user/user.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Schema } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
  ) {}

  getUserConversations(userId: Schema.Types.ObjectId) {
    return this.conversationRepo.find({
      where: {
        users: { $in: [userId] },
      },
    });
  }

  getConversation(id: string) {
    return this.conversationRepo.findOne(id);
  }

  async createConversation(sender: Schema.Types.ObjectId, userIds: string[]) {
    const users = await this.userService.getUsers(userIds);
    console.log(userIds, users);
    const conversation = this.conversationRepo.create({
      // users: [sender, users],
      messages: [],
    });
    console.log(conversation);
    return this.conversationRepo.save(conversation);
  }

  async sendMessage(
    userId: Schema.Types.ObjectId,
    sendMessageDto: SendMessageDto,
  ) {
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
