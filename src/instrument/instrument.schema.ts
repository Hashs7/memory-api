import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { File } from '../file/file.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Memory } from './memory/memory.schema';
import { IsArray } from 'class-validator';
import { Exclude } from 'class-transformer';

@Schema()
export class Instrument extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  @ApiProperty({
    description: "Surnom de l'instrument",
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: "Surnom de l'instrument",
  })
  description: string;

  @Prop({
    default: false,
  })
  @ApiProperty({
    description: 'Instrument est à vendre',
  })
  forSale: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: File.name,
  })
  @ApiProperty({ type: File })
  image: File;

  @Prop()
  @ApiProperty({
    example: 'Guitare',
    description: "Défini le type d'instrument",
  })
  type: string;

  @Prop()
  @ApiProperty({
    example: 'Gibson',
    description: "Marque de l'instrument",
  })
  brand: string;

  @Prop()
  @ApiProperty({
    example: 'Gibson SG',
    description: "Nom du model de l'instrument",
  })
  modelName: string;

  @Prop()
  @ApiProperty({
    description: 'Type de finition',
  })
  specification: string;

  @Prop()
  createdAt: Date;

  @Prop()
  buyDate: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({ type: User })
  owner: User;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
  })
  @ApiProperty({ type: [User] })
  oldOwners: User[];
  /*
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
  })
  @Prop(
    raw([
      {
        user: { type: MongooseSchema.Types.ObjectId, ref: User.name },
        date: { type: Date },
      },
    ]),
  )
  @ApiProperty({ type: [User] })
  oldOwners: [
    {
      user: User;
      date: Date;
    },
  ];
  */

  @IsArray()
  @Prop([Memory])
  @ApiProperty({
    type: [Memory],
  })
  memories: Memory[];

  @Prop()
  @Exclude()
  handoverToken: string;

  @Prop()
  @Exclude()
  handoverExpire: Date;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
