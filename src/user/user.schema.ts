import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { File } from '../file/file.schema';
import { Instrument } from '../instrument/instrument.schema';

type ValidatePasswordFunction<T> = (password: string) => T;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty({
    example: 'user@example.com',
  })
  email: string;

  @Prop()
  @ApiProperty({
    example: 'azerty123',
  })
  @Exclude()
  password: string;

  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  firstName: string;

  @Prop()
  @ApiProperty()
  lastName: string;

  @Prop()
  @ApiProperty()
  phoneNumber: string;

  @Prop()
  @ApiProperty()
  isOnline: boolean;

  @Prop()
  lastConnection: Date;

  @Prop()
  @Exclude()
  salt: string;

  @Prop({ select: false })
  @Exclude()
  resetPasswordToken: string;

  @Prop({ select: false })
  @Exclude()
  resetPasswordExpire: Date;

  @Prop({
    required: false,
    default: [],
  })
  @ApiProperty()
  wishList?: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: File.name,
    required: false,
  })
  @ApiProperty({ type: File })
  thumbnail?: File;

  validatePassword: ValidatePasswordFunction<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
