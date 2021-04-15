import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';

process.env.NODE_ENV = 'production';
if (process.env.NODE_ENV === 'production') require('dotenv').config();

@Module({
  imports: [
    ...(process.env.NODE_ENV === 'production' ? [
      AzureStorageModule.withConfig({
        sasKey: process.env.AZURE_STORAGE_SAS_KEY,
        accountName: process.env.AZURE_STORAGE_ACCOUNT,
        containerName: 'production',
      }),
    ] : [
      MulterModule.register({
        dest: './uploads',
      }),
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
