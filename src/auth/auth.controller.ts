import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
    UseInterceptors, UploadedFile
} from '@nestjs/common';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {fileInterceptorOptions} from '../utils/file-upload.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    @UseInterceptors(
        FileInterceptor('image', fileInterceptorOptions),
    )
    async signUp(
        @Body(ValidationPipe) createUserDTO: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<{ accessToken: string }> {
        return await this.authService.signUp(createUserDTO, file.filename);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return await this.authService.signIn(authCredentialsDto);
    }
}
