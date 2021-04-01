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
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@Controller('file')
export class FileController {
  /**
   * Upload single file
   * @param file
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('image', fileInterceptorOptions),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
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
    FilesInterceptor('image', 10, fileInterceptorOptions),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
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
}
