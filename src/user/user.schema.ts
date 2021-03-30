import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

type ValidatePasswordFunction<T> = (password: string) => T;

@Schema()
export class User extends Document {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  salt: string;

  validatePassword: ValidatePasswordFunction<boolean>;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
