import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Instrument {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  specification: string;
}

export type InstrumentDocument = Instrument & Document;

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
