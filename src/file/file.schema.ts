import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { UploadedFileMetadata } from '@nestjs/azure-storage/dist';

@Schema()
export class File extends Document implements UploadedFileMetadata {

  @Prop({ required: true })
  @ApiProperty({
    description: 'jean-mi.png',
  })
  originalname: string;

  @Prop()
  @ApiProperty({
    description: 'azure file name',
  })
  storageName: string;

  @Prop()
  @ApiProperty({
    description: 'azure url without token',
  })
  storageUrl: string;

  @Prop()
  @ApiProperty()
  buffer: Buffer;

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

  @Prop()
  createdAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({ type: User })
  owner: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
  })
  @ApiProperty({ type: [User] })
  oldOwners: MongooseSchema.Types.ObjectId[];

}

export const FileSchema = SchemaFactory.createForClass(File);
