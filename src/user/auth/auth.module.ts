import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './helpers/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from '../../config/jwt.config';
import { UserModule } from '../user.module';
import { User, UserSchema } from '../user.schema';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [
    UserModule,
    MailModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, MailService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
