import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './schema/conversation.schema';
import { Message } from './schema/message.schema';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private chatGateway: ChatGateway,
    private userService: UserService,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  /**
   *
   * @param userId
   */
  getUserConversations(userId: Schema.Types.ObjectId): Promise<Conversation[]> {
    return this.conversationModel
      .find({ users: userId })
      .populate('users', 'username')
      .exec();
  }

  /**
   *
   * @param id
   */
  getConversation(id: string): Promise<Conversation> {
    return this.conversationModel.findById(id).exec();
  }

  /**
   * TODO check if conversation already exist
   * @param sender
   * @param userIds
   */
  async createConversation(
    sender: Schema.Types.ObjectId,
    userIds: string[],
  ): Promise<Conversation> {
    const users = await this.userService.findUsers(userIds);
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
    const message = new Message(userId, sendMessageDto.text);
    conversation.messages.push(message);
    conversation.markModified('messages');
    await conversation.save();

    this.chatGateway.wss.emit('newMessage', {
      conversation: conversation._id,
      message,
    });
    return conversation;
  }
}
