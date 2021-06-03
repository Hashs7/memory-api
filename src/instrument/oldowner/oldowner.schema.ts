import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../user/user.schema';

@Schema()
export class OldOwner extends Types.Subdocument {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({ type: User })
  user: User;

  @Prop({ type: Date })
  @ApiProperty()
  from: Date;

  @Prop({ type: Date })
  @ApiProperty()
  to: Date;
}

export const OldOwnerSchema = SchemaFactory.createForClass(OldOwner);
