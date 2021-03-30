import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Instrument {
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
