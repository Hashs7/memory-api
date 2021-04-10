import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true, _id: false })
export class Message extends Types.Subdocument  {
  @Prop({ type: User, required: true })
  @ApiProperty({ type: User })
  sender: User;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Date, required: true })
  @ApiProperty()
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