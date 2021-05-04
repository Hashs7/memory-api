import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';
import {File} from '../../../file/file.schema';
import {Document, Schema as MongooseSchema} from 'mongoose';

export enum ContentType {
  Video = 'video',
  Image = 'image',
  Audio = 'audio',
  Text = 'text',
}

@Schema({timestamps: true})
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
  @ApiProperty({type: File})
  file: MongooseSchema.Types.ObjectId;
}

export const MemoryContentSchema = SchemaFactory.createForClass(MemoryContent);
