import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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
}

export const MemoryContentSchema = SchemaFactory.createForClass(MemoryContent);