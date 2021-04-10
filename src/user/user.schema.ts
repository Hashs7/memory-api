import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Exclude} from 'class-transformer';
import {Document} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import DateTimeFormat = Intl.DateTimeFormat;

type ValidatePasswordFunction<T> = (password: string) => T;

@Schema()
export class User extends Document {
    @Prop({required: true})
    @ApiProperty({
        example: 'user@example.com',
    })
    email: string;

    @Prop()
    @ApiProperty({
        example: 'azerty123'
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
    @ApiProperty({
        title: 'Profile image',
        description: "Image url",
    })
    image: string;

    @Prop()
    @Exclude()
    salt: string;

    @Prop()
    @Exclude()
    resetPasswordToken: string;

    @Prop()
    @Exclude()
    resetPasswordExpire: Date;

    validatePassword: ValidatePasswordFunction<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
    password: string,
): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
};
