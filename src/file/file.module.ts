import { Global, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { MulterModule } from '@nestjs/platform-express';
import { File, FileSchema } from './file.schema';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
    AzureStorageModule.withConfig({
      sasKey: process.env.AZURE_STORAGE_SAS_KEY,
      accountName: process.env.AZURE_STORAGE_ACCOUNT,
      containerName: process.env.NODE_ENV,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, AzureStorageModule],
})
export class FileModule {}
