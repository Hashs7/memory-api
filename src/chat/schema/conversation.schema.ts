import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/user.schema';
import { Message } from './message.schema';

@Schema()
export class Conversation extends Document {
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
    required: true,
  })
  users: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Message })
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
