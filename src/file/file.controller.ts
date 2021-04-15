import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus, BadRequestException, Logger,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ApiTags } from '@nestjs/swagger';
import { AzureStorageFileInterceptor, AzureStorageService, UploadedFileMetadata } from '@nestjs/azure-storage/dist';
import { randomBytes } from "crypto";
import got from 'got';
import { FileService } from './file.service';

process.env.NODE_ENV = 'production';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    private readonly azureStorage: AzureStorageService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Upload single file
   * @param file
   */
  @Post()
  @UseInterceptors(
    process.env.NODE_ENV !== 'production' ?
    FileInterceptor('file', fileInterceptorOptions) :
    AzureStorageFileInterceptor('file'),
  )
  async uploadedFile(
    @UploadedFile() file: UploadedFileMetadata
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    await this.fileService.create(file);

    const response = {
      originalname: file.originalname,
      storageUrl: file.storageUrl,
    };

    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully',
      data: response,
    };
  }

  /**
   * Upload multiple files
   * @param files
   */
  @Post('multiple')
  @UseInterceptors(
    process.env.NODE_ENV !== 'production' ?
      FilesInterceptor('file', 10, fileInterceptorOptions) :
      AzureStorageFileInterceptor('file'),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    if (!files) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    files.forEach((file) => {
      // @ts-ignore
      file.storageUrl = this.createStorageUrl(file);
      const fileReponse = {
        originalname: file.originalname,
        storageUrl: file.storageUrl,
      };
      response.push(fileReponse);
    });

    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  /**
   * Get file by name
   * @param image
   * @param res
   */
  @Get(':imagename')
  async getImage(@Param('imagename') image, @Res() res) {
    let response;
    if (process.env.NODE_ENV !== 'production') {
      response = res.sendFile(image, { root: './uploads' });
    } else {
      // TODO Get image from storage
      const url = 'https://memoryapp.blob.core.windows.net/production/telechargement.jpeg' + process.env.AZURE_STORAGE_SAS_KEY;
      const getFile = await got(url).buffer();
      res.set('Content-Type', 'image/png');
      response = res.send(getFile);
      Logger.log('coucou', 'ccc')
    }

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  fileProxy(url) {
    
  }

  uniquifyFilename(filename): string {
    const prefix = randomBytes(10).toString('hex');
    return prefix + filename;
  }

  /**
   * TODO remove
   * @param file
   */
  createStorageUrl(file: Express.Multer.File) {
    const port = parseInt(process.env.PORT) | 3000;
    return `http://localhost:${port}/file/${file.filename}`;
  }
}
