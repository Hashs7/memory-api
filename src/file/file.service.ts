import { Injectable, Logger } from '@nestjs/common';
import { File } from './file.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AzureStorageService } from '@nestjs/azure-storage/dist';
import { randomBytes } from "crypto";

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    private readonly azureStorage: AzureStorageService,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {
  }

  findOne(id: string) {
    return this.fileModel.findOne({ id });
  }

  async create(file): Promise<File> {
    const { originalname } = file;
    const generatedName = randomBytes(10).toString('hex');

    if (!file.storageUrl) {
      // Store image locally
      // @ts-ignore
      file.storageUrl = this.createStorageUrl(file);
    } else {
      // Store image on azure
      const filetype = file.mimetype.split('/').shift();
      console.log(filetype, generatedName);
      Logger.log(`file ${filetype} ${file.mimetype} ${file.size} ${file.storageUrl} `)
      file = {
        ...file,
        originalname: generatedName + '.' + filetype,
      };
      file.storageUrl = await this.azureStorage.upload(file);
      file.storageUrl = file.storageUrl.split(process.env.AZURE_STORAGE_SAS_KEY).shift();
      Logger.log(`file ${file.originalname} ${file.mimetype} ${file.size} ${file.storageUrl} `)
    }

    const fileDoc = await this.fileModel.create({
      ...file,
      name: originalname,
    });

    return fileDoc;
  }

  /**
   * Add storage property Multer file
   * @param file
   */
  createStorageUrl(file: Express.Multer.File) {
    const port = parseInt(process.env.PORT) | 3000;
    return `http://localhost:${port}/file/${file.filename}`;
  }

  // createMultiple() {}
}
