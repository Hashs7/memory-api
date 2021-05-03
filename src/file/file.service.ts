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
    return this.fileModel.findOne({ _id: id });
  }

  async create(file): Promise<File> {
    const { originalname } = file;
    Logger.log(file)
    const generatedName = randomBytes(10).toString('hex');
    const filetype = file.mimetype.split('/').shift();
    Logger.log(`file ${filetype} ${file.mimetype} ${file.size} ${file.storageUrl} `)
    file = {
      ...file,
      originalname: generatedName + '.' + filetype,
    };

    if (process.env.NODE_ENV !== 'production') {
      // Store image locally
      // @ts-ignore
      file.path = file.path.split('/')[0];
      // file.storageUrl = this.createStorageUrl(file);
    } else {
      // Store image on azure
      const path = await this.azureStorage.upload(file);
      file.path = path.split(process.env.AZURE_STORAGE_SAS_KEY).shift();
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
