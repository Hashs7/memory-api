import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../config/jwt.config';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Conversation } from './conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    UserModule,
  ],
  providers: [ChatGateway, ChatService, UserService],
  controllers: [ChatController]
})
export class ChatModule {}
