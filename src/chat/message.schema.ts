import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Message extends Document {
  @Prop({ type: User, required: true })
  @ApiProperty({
    title: 'User ObjectId',
    type: String,
  })
  sender: User;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

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
    this.createdAt = new Date(Date.now());
  }
}

export const MessageSchema = SchemaFactory.createForClass(Message);

/*
MessageSchema.static({
  createCollection({ sender, text }, callback) {
    console.log('ccc')
    this.sender = sender;
    this.text = text;
    this.createdAd = new Date(Date.now());
    callback(null, collection);
  }
});
*/
