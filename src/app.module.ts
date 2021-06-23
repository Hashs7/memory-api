import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { InstrumentModule } from './instrument/instrument.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './user/auth/auth.module';
import { CategoryModule } from './instrument/memory/category/category.module';
import { CommandModule } from 'nestjs-command';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './user/auth/helpers/JwtAuthGuard';
import { SearchModule } from './search/search.module';
import { FeedModule } from './feed/feed.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongooseConfig),
    AuthModule,
    CommandModule,
    InstrumentModule,
    FileModule,
    /*
    MulterModule.register({
      dest: './uploads',
    }),
    */
    UserModule,
    ChatModule,
    MailModule,
    CategoryModule,
    SearchModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
