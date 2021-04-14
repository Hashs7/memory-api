import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ApiTags } from '@nestjs/swagger';
import { AzureStorageFileInterceptor, UploadedFileMetadata } from '@nestjs/azure-storage/dist';

@ApiTags('file')
@Controller('file')
export class FileController {

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

    if (!file.storageUrl) {
      // @ts-ignore
      file.storageUrl = this.createStorageUrl(file);
    }

    const response = {
      originalname: file.originalname,
      storageUrl: file.storageUrl,
    };

    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
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
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  /**
   * Add storage property Multer file
   * @param file
   */
  createStorageUrl(file: Express.Multer.File) {
    const port = parseInt(process.env.PORT) | 3000;
    return `http://localhost:${port}/file/${file.filename}`;
  }
}
