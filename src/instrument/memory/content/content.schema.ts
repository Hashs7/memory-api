import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../../file/file.schema';
import { Schema as MongooseSchema, Types } from 'mongoose';

export enum ContentType {
  Video = 'video',
  Image = 'image',
  Audio = 'audio',
  Text = 'text',
}

@Schema({ timestamps: true })
export class MemoryContent extends Types.Subdocument {
  @Prop()
  @ApiProperty()
  position: number;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop({
    required: true,
  })
  @ApiProperty({
    enum: Object.values(ContentType),
  })
  type: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: File.name,
  })
  @ApiProperty({ type: File })
  file: File;
}

export const MemoryContentSchema = SchemaFactory.createForClass(MemoryContent);
