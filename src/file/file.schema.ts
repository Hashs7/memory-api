import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.schema';
import { Instrument } from '../instrument/instrument.schema';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  @ApiProperty({
    example: '02020303200.png',
  })
  originalname: string;

  @Prop()
  @ApiProperty({
    example: 'filename.png',
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: 'file path',
    example: '/path/to',
  })
  path: string;

  @Prop()
  @ApiProperty()
  encoding: string;

  @Prop()
  @ApiProperty()
  fieldname: string;

  @Prop()
  @ApiProperty({
    example: 'image/png',
  })
  mimetype: string;

  @Prop()
  @ApiProperty()
  size: string;

/*  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Instrument.name,
    required: true,
  })
  @ApiProperty({ type: User })
  user: MongooseSchema.Types.ObjectId;*/
}

export const FileSchema = SchemaFactory.createForClass(File);
