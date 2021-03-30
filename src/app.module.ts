import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { InstrumentModule } from './instrument/instrument.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync(typeOrmConfig),
    MongooseModule.forRootAsync(mongooseConfig),
    // AuthModule,
    InstrumentModule,
    FilesModule,
    MulterModule.register({
      dest: './uploads',
    }),
    /*UserModule,
    ChatModule,*/
    /*GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),*/
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
