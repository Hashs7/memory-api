import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { InstrumentModule } from './instrument/instrument.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MemoryModule } from './memory/memory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongooseConfig),
    AuthModule,
    InstrumentModule,
    FileModule,
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    ChatModule,
    MemoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
