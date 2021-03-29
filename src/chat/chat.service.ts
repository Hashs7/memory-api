import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import {ObjectID, Repository} from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from './message.entity';
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";
import {SendMessageDto} from "./dto/send-message.dto";
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private chatGateway: ChatGateway,
    @InjectRepository(Conversation) private conversationRepo: Repository<Conversation>,
  ) {}

  getUserConversations(userId: ObjectID) {
    return this.conversationRepo.find({
      where: {
        users: { $in: [userId] },
      }
    });
  }

  getConversation(id: ObjectID) {
    return this.conversationRepo.findOne(id);
  }

  async createConversation(sender: ObjectID, userIds: string[]) {
    const users = await this.userService.getUsersByIds(userIds);
    const ids = users.map(({ _id }) => _id);
    const conversation = this.conversationRepo.create({
      users: [sender, ...ids],
      messages: [],
    });
    return this.conversationRepo.save(conversation);
  }

  async sendMessage(userId: ObjectID, sendMessageDto: SendMessageDto) {
    const conversation = await this.getConversation(sendMessageDto.conversation);
    if (!conversation.messages) {
      conversation.messages = [];
    }
    const message: Message = new Message(userId, sendMessageDto.text);
    conversation.messages.push(message);
    this.chatGateway.wss.emit('newMessage', {
      conversation: conversation._id,
      message
    });
    return this.conversationRepo.update(conversation._id, conversation);
  }
}
