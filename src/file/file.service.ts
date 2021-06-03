import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { File } from './file.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { User } from '../user/user.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    // private azureStorage: AzureStorageService,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  async findOne(id: string) {
    const file = await this.fileModel.findOne({ _id: id });
    file.rewritePath();
    return file;
  }

  async findForUser(user: User) {
    const files = await this.fileModel.find({ user: user._id });
    return files.map((f) => {
      f.rewritePath();
      return f;
    });
  }

  async create(file: Express.Multer.File, userId: string): Promise<File> {
    const { originalname } = file;
    const generatedName = randomBytes(10).toString('hex');
    const filetype = file.mimetype.split('/').shift();
    Logger.log(`file ${filetype} ${file.mimetype} ${file.size}`);

    if (process.env.NODE_ENV !== 'production') {
      // Store image locally
      file.path = file.path.split('/')[1];
    } else {
      // Store image on azure
      /*const path = await this.azureStorage.upload(file);
      file.path = path.split(process.env.AZURE_STORAGE_SAS_KEY).shift();*/
    }

    const fileDoc = await this.fileModel.create({
      ...file,
      name: originalname,
      user: userId,
    });

    fileDoc.rewritePath();

    return fileDoc;
  }

  async remove(id: string, user: User) {
    const file = await this.fileModel.findOne({ _id: id });

    if (user._id.equals(file.user)) {
      throw new UnauthorizedException(
        "Vous n'êtes pas propriétaire du fichier",
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      const filePath = `${path.resolve('./')}/uploads/${file.path}`;
      fs.unlinkSync(filePath);
      await file.delete();
    } else {
      // Delete image on azure
    }
  }
}
