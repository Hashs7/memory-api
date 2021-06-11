import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class MemoryCategory extends Types.Subdocument {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  slug: string;
}

export const MemoryCategorySchema = SchemaFactory.createForClass(
  MemoryCategory,
);
