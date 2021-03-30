import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

export class Message extends Document {
  @Prop({ type: User, required: true })
  sender: User;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, required: true })
  createdAd: Date;

  /*
  @Prop({
    type: String,
    required: true,
    enum: [MessageType.name, MessageType.name],
  })
  type: string;
  */

  constructor(sender, text) {
    super();
    this.sender = sender;
    this.text = text;
    this.createdAd = new Date(Date.now());
  }
}

export const MessageSchema = SchemaFactory.createForClass(Message);
