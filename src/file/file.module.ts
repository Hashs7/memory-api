import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { MulterModule } from '@nestjs/platform-express';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

@Module({
  imports: [
    ...(process.env.NODE_ENV === 'production' ? [
      AzureStorageModule.withConfig({
        sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
        accountName: process.env['AZURE_STORAGE_ACCOUNT'],
        containerName: 'production',
      }),
    ] : [
      MulterModule.register({
        dest: './uploads',
      }),
    ]),
  ],
  controllers: [FileController],
})
export class FileModule {}
