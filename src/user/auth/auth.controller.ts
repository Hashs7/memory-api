import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgotDto } from './dto/auth-forgot.dto';
import { AllowAny } from './JwtAuthGuard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAny()
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDTO: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signUp(createUserDTO);
  }

  @AllowAny()
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @AllowAny()
  @Post('/forgot-password')
  async forgotPassword(
    @Body(ValidationPipe) authForgotDto: AuthForgotDto,
  ): Promise<{ response: string }> {
    return await this.authService.askResetPassword(authForgotDto);
  }

  @AllowAny()
  @Post('/reset')
  async reset(
    @Body(ValidationPipe) authResetDto: AuthResetDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.resetPassword(authResetDto);
  }
}
