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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileInterceptorOptions } from '../utils/file-upload.utils';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { randomBytes } from 'crypto';
import got from 'got';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { Instrument } from '../instrument/instrument.schema';
import { GetUser } from '../user/auth/get-user.decorator';
import { User } from '../user/user.schema';

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

  @Get(':imageName')
  getImage(@Param('imageName') image, @Res() res) {
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
