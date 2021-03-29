import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstrumentModule } from './instrument/instrument.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
