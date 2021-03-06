import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { File } from './file.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.schema';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as mime from 'mime-types';
import { unwritePath } from './file.helper';
import {
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import got from 'got';

@Injectable()
export class FileService {
  root: string;

  constructor(
    private configService: ConfigService,
    private azureStorage: AzureStorageService,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {
    this.root = './uploads';
  }

  async findOne(id: string) {
    return this.fileModel.findOne({ _id: id });
  }

  async findForUser(user: User) {
    return this.fileModel.find({ user: user._id });
  }

  async create(file: Express.Multer.File, userId: string): Promise<File> {
    const { originalname } = file;
    file.path = file.path.split('/')[1];

    return this.fileModel.create({
      ...file,
      date: new Date(),
      name: originalname,
      user: userId,
    });
  }

  async createAzure(file: UploadedFileMetadata, userId: string): Promise<File> {
    const { originalname } = file;
    // const generatedName = randomBytes(10).toString('hex');
    // const filetype = file.mimetype.split('/').shift();
    // Logger.log(`file ${filetype} ${file.mimetype} ${file.size}`);

    // Store image on azure
    let path = await this.azureStorage.upload(file);
    path = path.split(process.env.AZURE_STORAGE_SAS_KEY).shift();

    return this.fileModel.create({
      ...file,
      path,
      date: new Date(),
      name: originalname,
      user: userId,
    });
  }

  async getFileHandler(
    res,
    image: string,
    download?: boolean,
    width?: number,
    height?: number,
  ) {
    if (width || height) {
      return this.filterImage(res, image, { width, height });
    }
    if (!download) {
      return this.serveFromFolder(res, image);
    }
    return this.download(res, image);
  }

  async filterImage(res, image, options) {
    let file;
    let mimetype;
    if (process.env.NODE_ENV !== 'production') {
      // Local image storage
      const filePath = `${this.root}/${image}`;
      file = fs.readFileSync(filePath);
      mimetype = mime.contentType(path.extname(filePath));
    } else {
      // Azure image storage
      // TODO not passing
      file = await got(image.path).buffer();
    }

    const sharpFile = await sharp(file).resize(options).toBuffer();
    res.set({ 'Content-Type': mimetype });
    const response = res.end(sharpFile);

    return {
      status: HttpStatus.OK,
      response,
    };
  }

  async renameFile(user: User, _id: string, name: string): Promise<File> {
    const file = await this.fileModel.findOne({ _id });
    if (!user._id.equals(file.user)) {
      throw new UnauthorizedException(
        "Vous n'??tes pas propri??taire du fichier",
      );
    }
    file.name = name;
    file.save();
    return file;
  }

  serveFromFolder(res, image) {
    const response = res.sendFile(image, { root: this.root });

    return {
      status: HttpStatus.OK,
      response,
    };
  }

  download(res, image) {
    res.setHeader(
      'Content-Disposition',
      'attachment: filename="' + image + '"',
    );
    res.download(`${this.root}/${image}`, image);

    return {
      status: HttpStatus.OK,
    };
  }

  async remove(id: string, user: User) {
    if (process.env.NODE_ENV === 'production') {
      throw new UnauthorizedException(
        "Vous n'??tes pas autoris?? ?? supprimer en production",
      );
    }

    const file = await this.fileModel.findOne({ _id: id });

    if (!user._id.equals(file.user)) {
      throw new UnauthorizedException(
        "Vous n'??tes pas propri??taire du fichier",
      );
    }

    file.unwritePath();

    if (process.env.NODE_ENV !== 'production') {
      const filePath = `${path.resolve('./')}/uploads/${file.path}`;
      fs.unlinkSync(filePath);
      await file.delete();
    }
  }
}
