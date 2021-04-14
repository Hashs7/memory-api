import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { InstrumentModule } from './instrument/instrument.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongooseConfig),
    AuthModule,
    InstrumentModule,
    FileModule,
    UserModule,
    ChatModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
