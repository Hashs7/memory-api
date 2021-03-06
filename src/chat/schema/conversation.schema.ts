import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/user.schema';
import { Message } from './message.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Conversation extends Document {
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
    required: true,
  })
  @ApiProperty()
  users: MongooseSchema.Types.ObjectId[];

  @Prop([Message])
  @ApiProperty({
    type: [Message]
  })
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
