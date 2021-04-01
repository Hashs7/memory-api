import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from "../user/user.schema";
import { ApiProperty } from '@nestjs/swagger';

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

  @Prop()
  @ApiProperty({
    title: 'Main image',
    description: "Image url",
  })
  image: string;

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
    description: "Type de finition",
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
  owner: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
  })
  oldOwners: MongooseSchema.Types.ObjectId[];
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
