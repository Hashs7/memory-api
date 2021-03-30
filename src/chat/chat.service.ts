import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Model, Schema, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './conversation.schema';
import { Message } from './message.schema';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  getUserConversations(userId: Schema.Types.ObjectId) {
    return this.conversationModel.find({ users: userId }).populate('users', 'username');
  }

  getConversation(id: string): Promise<Conversation> {
    return this.conversationModel.findById(id).exec();
  }

  async createConversation(sender: Schema.Types.ObjectId, userIds: string[]): Promise<Conversation> {
    const users = await this.userService.getUsers(userIds);
    const validUserIds = users.map(({ _id }) => _id);
    const conversation = await this.conversationModel.create({
      users: [sender, ...validUserIds],
      messages: [],
    });
    return conversation.save();
  }

  /**
   * Create new message to conversation
   * Send to websocket channel
   * @param userId
   * @param sendMessageDto
   */
  async sendMessage(
    userId: Schema.Types.ObjectId,
    sendMessageDto: SendMessageDto,
  ): Promise<Conversation> {
    const conversation = await this.getConversation(
      sendMessageDto.conversation,
    );
    if (!conversation.messages) {
      conversation.messages = [];
    }
    const message = await this.messageModel.create({
      sender: userId,
      text: sendMessageDto.text,
      createdAt: new Date(Date.now()),
    });
    conversation.messages.push(message);
    conversation.markModified('messages');
    return conversation.save();
  }
}
