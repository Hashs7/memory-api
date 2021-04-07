import {
  BadRequestException,
  Injectable,
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
  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const exist = await this.userService.findUserbyEmail(email);

    if (exist) {
      throw new BadRequestException('email already taken');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await this.hashPassword(password, salt);
    const user = await this.userService.createUser(
      createUserDto,
      salt,
      hashPassword,
    );

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.sendUserConfirmation(user, token);

    return this.generateAuthSuccessResponse(user);
  }

  /**
   * Log in user
   * @param authUserDTO
   * @param hashed
   */
  async signIn(authUserDTO: AuthCredentialsDto, hashed = false) {
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

  async askResetPassword(authResetDto: AuthResetDto) {
    const user = await this.userService.findByUsernameOrEmail(
      authResetDto.username,
    );

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.sendResetPassword(user, token);

    user.resetToken = token;

    await user.save();

    return {
      response: 'Email envoyé'
    }
  }

  async resetPassword(token: string) {

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
  async generateAuthSuccessResponse(user: User, isRefresh = false) {
    const payload = {
      username: user.username,
      email: user.email,
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(
      payload,
      jwtConstants.rSignOptions,
    );
    const decoded = this.decodeToken(accessToken);
    return { accessToken, refreshToken, data: decoded };
  }

  async refreshToken(accessToken: string) {
    const user: any = this.jwtService.decode(accessToken);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return await this.generateAuthSuccessResponse(user, true);
  }
}
