import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { User } from '../../user/user.schema';
import { IsArray } from 'class-validator';
import { MemoryContent } from './content/content.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const timestamps2 = require('mongoose-timestamp2');

export enum MemoryType {
  Concert = 'Concert',
  Rehearsal = 'Rehearsal',
}

export enum MemoryVisibility {
  Private = 'Private',
  UrlOnly = 'UrlOnly',
  Public = 'Public',
}

@Schema()
export class Memory extends Types.Subdocument {
  @Prop({ required: true })
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({
    default: '',
  })
  @ApiProperty()
  template: string;

  @Prop({ type: Date })
  @ApiProperty()
  date: Date;

  @Prop({
    required: false,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type?: string;

  @Prop()
  @ApiProperty({
    enum: Object.values(MemoryVisibility),
    default: MemoryVisibility.Private,
  })
  visibility: string;

  /*
  @Prop({
    type: String,
    enum: Object.values(MemoryType),
    required: true,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type: string;
  */

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({
    type: User,
  })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
    required: false,
  })
  @ApiProperty({
    type: [User],
  })
  withUsers?: MongooseSchema.Types.ObjectId[];

  @IsArray()
  @Prop([MemoryContent])
  @ApiProperty({
    type: [MemoryContent],
  })
  contents: MemoryContent[];
}

export const MemorySchema = SchemaFactory.createForClass(Memory).plugin(
  timestamps2,
);
