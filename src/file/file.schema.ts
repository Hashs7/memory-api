import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

@Schema()
export class File extends Document {

  @Prop({ required: true })
  @ApiProperty({
    description: '02020303200.png',
  })
  originalname: string;

  @Prop()
  @ApiProperty({
    description: 'filename.png',
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: 'azure url without token',
  })
  storageUrl: string;

  @Prop()
  @ApiProperty()
  encoding: string;

  @Prop()
  @ApiProperty()
  fieldname: string;

  @Prop()
  @ApiProperty()
  mimetype: string;

  @Prop()
  @ApiProperty()
  size: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
