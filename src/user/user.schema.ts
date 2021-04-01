import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

type ValidatePasswordFunction<T> = (password: string) => T;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  @Exclude()
  password: string;

  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @Exclude()
  salt: string;

  validatePassword: ValidatePasswordFunction<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
