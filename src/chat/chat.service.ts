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
  ) {}

  // getUserConversations(userId: Schema.Types.ObjectId): Promise<Conversation[]> {
  getUserConversations(userId: Schema.Types.ObjectId) {
    return this.conversationModel.find({ users: userId });
    // return this.conversationModel.find({ users: userId });
  }

  getConversation(id: string) {
    return this.conversationModel.findById(id);
  }

  async createConversation(sender: Schema.Types.ObjectId, userIds: string[]) {
    const users = await this.userService.getUsers(userIds);
    const validUserIds = users.map(({ _id }) => _id);
    console.log([sender, ...validUserIds]);
    const conversation = await this.conversationModel.create({
      users: [sender, ...validUserIds],
      messages: [],
    });
    console.log(conversation);
    return conversation.save();
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
    return conversation.save();
  }
}
