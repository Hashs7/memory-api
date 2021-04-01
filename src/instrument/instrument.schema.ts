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
    example: 'Ma blonde',
    description: "Surnom de l'instrument",
  })
  name: string;

  @Prop()
  @ApiProperty({
    example: 'Guitare',
    description: "Défini le type d'instrument",
  })
  type: string;

  @Prop()
  specification: string;

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
