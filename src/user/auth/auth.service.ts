import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { jwtConstants } from '../../config/jwt.config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../user.schema';
import { MailService } from 'src/mail/mail.service';
import { AuthResetDto } from './dto/auth-reset.dto';
import { randomBytes } from 'crypto';
import { AuthForgotDto } from './dto/auth-forgot.dto';
import { IAuthResponse } from './helpers/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create new user
   * @param createUserDto
   */
  async signUp(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const { email, password, username } = createUserDto;
    const existEmail = await this.userService.findUserbyEmail(email);
    const existUsername = await this.userService.usernameExist(username);

    if (existEmail) {
      throw new BadRequestException("L'email est déjà utilisé");
    }
    if (existUsername) {
      throw new BadRequestException('Le pseudo est déjà utilisé');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await this.hashPassword(password, salt);
    const user = await this.userService.createUser(
      createUserDto,
      salt,
      hashPassword,
    );

    return this.generateAuthSuccessResponse(user);
  }

  /**
   * Log in user
   * @param authUserDTO
   * @param hashed
   */
  async signIn(
    authUserDTO: AuthCredentialsDto,
    hashed = false,
  ): Promise<IAuthResponse> {
    const user = await this.userService.findByUsernameOrEmail(
      authUserDTO.username,
    );

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    if (hashed === false) {
      if (!(await user.validatePassword(authUserDTO.password))) {
        throw new UnauthorizedException('Le mot de passe ne correspond pas');
      }
    } else {
      if (user.password !== authUserDTO.password) {
        throw new UnauthorizedException('Le mot de passe ne correspond pas');
      }
    }

    return this.generateAuthSuccessResponse(user);
  }

  /**
   * Generate reset password token
   * Available for the next hour
   * @param authForgotDto
   */
  async askResetPassword(authForgotDto: AuthForgotDto) {
    const user = await this.userService.findByUsernameOrEmail(
      authForgotDto.username,
    );

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const token = randomBytes(20).toString('hex');
    await this.mailService.sendResetPassword(user, token);

    user.resetPasswordToken = token;
    const expire = new Date();
    expire.setHours(expire.getHours() + 1);
    user.resetPasswordExpire = expire;

    await user.save();

    return {
      response: 'Email envoyé',
    };
  }

  /**
   * Validate reset token
   * Update user password
   * @param authResetDto
   */
  async resetPassword(authResetDto: AuthResetDto) {
    const user = await this.userService.findUserWithResetToken(
      authResetDto.token,
    );
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    if (new Date() > user.resetPasswordExpire) {
      throw new UnauthorizedException('Le token a expiré');
    }

    const hashPassword = await this.hashPassword(
      authResetDto.password,
      user.salt,
    );
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    ['password', 'resetPasswordToken', 'resetPasswordExpire'].forEach((item) =>
      user.markModified(item),
    );
    await user.save();

    return this.generateAuthSuccessResponse(user);
  }

  /**
   * Encrypt password
   * @param password
   * @param salt
   */
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * Decode token to get user
   * @param accessToken
   */
  decodeToken(accessToken: string) {
    return this.jwtService.decode(accessToken);
  }

  /**
   * Format auth response
   * @param user
   * @param isRefresh
   */
  private async generateAuthSuccessResponse(
    user: User,
    isRefresh = false,
  ): Promise<IAuthResponse> {
    const payload = {
      username: user.username,
      email: user.email,
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(
      payload,
      jwtConstants.rSignOptions,
    );
    // const decoded = this.decodeToken(accessToken);
    const userFilled = await this.userService.findUserByUsername(user.username);

    return {
      accessToken,
      refreshToken,
      user: userFilled,
    };
  }

  async refreshToken(accessToken: string) {
    const user: any = this.jwtService.decode(accessToken);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return await this.generateAuthSuccessResponse(user, true);
  }
}
