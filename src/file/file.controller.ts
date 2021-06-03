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
  UseGuards,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as sharp from 'sharp';
import * as path from 'path';
import got from 'got';
import * as mime from 'mime-types';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { Instrument } from '../instrument/instrument.schema';
import { GetUser } from '../user/auth/get-user.decorator';
import { User } from '../user/user.schema';
import { AllowAny } from '../user/auth/JwtAuthGuard';
import * as fs from 'fs';

// process.env.NODE_ENV = 'production';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Upload single file
   * @param user
   * @param file
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    /*process.env.NODE_ENV !== 'production'
      ? FileInterceptor('file', fileInterceptorOptions)
      : AzureStorageFileInterceptor('file'),
    */
    FileInterceptor('file', fileInterceptorOptions),
  )
  async uploadedFile(@GetUser() user: User, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    const data = await this.fileService.create(file, user._id);

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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    /*
    process.env.NODE_ENV !== 'production'
      ? FilesInterceptor('file', 10, fileInterceptorOptions)
      : AzureStorageFileInterceptor('file'),
    */
    FilesInterceptor('file', 10, fileInterceptorOptions),
  )
  async uploadMultipleFiles(@GetUser() user: User, @UploadedFiles() files) {
    const response = [];
    if (!files) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    for (const file of files) {
      const data = await this.fileService.create(file, user._id);
      response.push(data);
    }

    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      response,
    };
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [Instrument],
  })
  async getUserFiles(@GetUser() user: User) {
    return this.fileService.findForUser(user);
  }

  @AllowAny()
  @Get(':imageName')
  async getImage(
    @Param('imageName') image,
    @Query('download') download: boolean,
    @Query('w') width: number,
    @Query('h') height: number,
    @Res() res,
  ) {
    const root = './uploads';
    if (width || height) {
      const filePath = `${root}/${image}`;
      const file = fs.readFileSync(filePath);
      Logger.log(mime.contentType(path.extname(filePath)));
      const sharpFile = await sharp(file).resize(Number(width)).toBuffer();
      res.set({
        'Content-Type': mime.contentType(path.extname(filePath)),
      });
      const response = res.end(sharpFile);

      return {
        status: HttpStatus.OK,
        response,
      };
    }
    if (!download) {
      const response = res.sendFile(image, { root });

      return {
        status: HttpStatus.OK,
        response,
      };
    }

    res.setHeader(
      'Content-Disposition',
      'attachment: filename="' + image + '"',
    );
    res.download(`${root}/${image}`, image);

    return {
      status: HttpStatus.OK,
    };
  }

  /**
   * Get file by name
   * @param id
   * @param res
   */
  @AllowAny()
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
      res.set('Content-Type', image.mimetype);
      response = res.send(getFile);
    }

    return {
      status: HttpStatus.OK,
      response,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete instrument with shortId' })
  @ApiBearerAuth()
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.fileService.remove(id, user);
  }
}
