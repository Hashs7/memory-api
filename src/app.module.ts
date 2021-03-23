import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { InstrumentModule } from './instrument/instrument.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    InstrumentModule,
    FilesModule,
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    ChatModule,
    /*GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),*/
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
