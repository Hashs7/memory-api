import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File, FileSchema } from './file.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';

// process.env.NODE_ENV = 'production';
// if (process.env.NODE_ENV === 'production') require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
    AzureStorageModule.withConfig({
      sasKey: process.env.AZURE_STORAGE_SAS_KEY,
      accountName: process.env.AZURE_STORAGE_ACCOUNT,
      containerName: 'production',
    }),
    ...(process.env.NODE_ENV !== 'production'
      ? [
          MulterModule.register({
            dest: './uploads',
          }),
        ]
      : []),
    /*...(process.env.NODE_ENV === 'production' ? [
      AzureStorageModule.withConfig({
        sasKey: process.env.AZURE_STORAGE_SAS_KEY,
        accountName: process.env.AZURE_STORAGE_ACCOUNT,
        containerName: 'production',
      }),
    ] : [
      MulterModule.register({
        dest: './uploads',
      }),
    ]),*/
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
