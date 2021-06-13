import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgotDto } from './dto/auth-forgot.dto';
import { AllowAny } from './helpers/JwtAuthGuard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register new user
   * @param createUserDTO
   */
  @AllowAny()
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDTO: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(createUserDTO);
  }

  /**
   * Login user
   * @param authCredentialsDto
   */
  @AllowAny()
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /**
   * Request reset user password
   * @param authForgotDto
   */
  @AllowAny()
  @Post('/forgot-password')
  async forgotPassword(
    @Body(ValidationPipe) authForgotDto: AuthForgotDto,
  ): Promise<{ response: string }> {
    return this.authService.askResetPassword(authForgotDto);
  }

  /**
   * Set new user password
   * @param authResetDto
   */
  @AllowAny()
  @Post('/reset')
  async reset(
    @Body(ValidationPipe) authResetDto: AuthResetDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.resetPassword(authResetDto);
  }
}
