import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../user/user.schema';
import { IsArray } from 'class-validator';
import { MemoryContent } from './content/content.schema';
import { MemoryCategory } from './category/category.schema';
import { File } from '../../file/file.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const timestamps2 = require('mongoose-timestamp2');

export enum MemoryVisibility {
  Private = 'private',
  Unlisted = 'unlisted',
  Public = 'public',
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

  @Prop({ default: MemoryVisibility.Private })
  @ApiProperty({
    enum: Object.values(MemoryVisibility),
    default: MemoryVisibility.Private,
  })
  visibility: string;

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

  @Prop(MemoryContent)
  @ApiProperty({
    type: MemoryContent,
  })
  preview: MemoryContent;

  @IsArray()
  @Prop([MemoryContent])
  @ApiProperty({
    type: [MemoryContent],
  })
  contents: MemoryContent[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: MemoryCategory.name,
    required: false,
  })
  @ApiProperty({
    type: [MemoryCategory],
  })
  categories?: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: File.name,
    required: false,
  })
  @ApiProperty({ type: File })
  music: File;
}

export const MemorySchema = SchemaFactory.createForClass(Memory).plugin(
  timestamps2,
);
