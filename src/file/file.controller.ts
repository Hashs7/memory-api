import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ApiTags } from '@nestjs/swagger';
import { randomBytes } from 'crypto';
import got from 'got';
import { FileService } from './file.service';

// process.env.NODE_ENV = 'production';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Upload single file
   * @param file
   */
  @Post()
  @UseInterceptors(
    /*process.env.NODE_ENV !== 'production'
      ? FileInterceptor('file', fileInterceptorOptions)
      : AzureStorageFileInterceptor('file'),
    */
    FileInterceptor('file', fileInterceptorOptions),
  )
  async uploadedFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    const data = await this.fileService.create(file);

    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully',
      response: data,
    };
  }

  /**
   * Upload multiple files
   * @param files
   */
  @Post('multiple')
  @UseInterceptors(
    /*
    process.env.NODE_ENV !== 'production'
      ? FilesInterceptor('file', 10, fileInterceptorOptions)
      : AzureStorageFileInterceptor('file'),
    */
    FilesInterceptor('file', 10, fileInterceptorOptions),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    if (!files) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    for (const file of files) {
      const data = await this.fileService.create(file);
      response.push(data);
    }

    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      response,
    };
  }

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });

    return {
      status: HttpStatus.OK,
      response,
    };
  }

  /**
   * Get file by name
   * @param id
   * @param res
   */
  @Get('id/:id')
  async getImageById(@Param('id') id, @Res() res) {
    let response;
    const image = await this.fileService.findOne(id);

    if (process.env.NODE_ENV !== 'production') {
      response = res.sendFile(image.originalname, { root: `./${image.path}` });
    } else {
      // const url = `${process.env.AZURE_STORAGE_URL}/production/telechargement.jpeg${process.env.AZURE_STORAGE_SAS_KEY}`;
      const url = `${process.env.AZURE_STORAGE_URL}${image.path}/${image.originalname}${process.env.AZURE_STORAGE_SAS_KEY}`;
      const getFile = await got(url).buffer();
      // res.set('Content-Type', 'image/png');
      res.set('Content-Type', image.mimetype);
      response = res.send(getFile);
    }

    return {
      status: HttpStatus.OK,
      response,
    };
  }

  uniquifyFilename(filename): string {
    const prefix = randomBytes(10).toString('hex');
    return prefix + filename;
  }
}
