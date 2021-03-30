import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Instrument extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  specification: string;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
