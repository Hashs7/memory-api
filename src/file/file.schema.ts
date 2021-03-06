import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User, UserSchema } from '../user/user.schema';
import { rewritePath, unwritePath } from './file.helper';

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

  @Prop()
  @ApiProperty()
  width: number;

  @Prop()
  @ApiProperty()
  height: number;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @ApiProperty({ type: User })
  user: MongooseSchema.Types.ObjectId;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rewritePath() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unwritePath() {}
}

export const FileSchema = SchemaFactory.createForClass(File);

FileSchema.methods.rewritePath = async function () {
  this.path = rewritePath(this);
};

FileSchema.methods.unwritePath = async function () {
  this.path = unwritePath(this);
};

FileSchema.post('init', function () {
  this.path = rewritePath(this);
});
