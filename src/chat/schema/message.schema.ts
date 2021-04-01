import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true, _id: false })
export class Message extends Types.Subdocument  {
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
