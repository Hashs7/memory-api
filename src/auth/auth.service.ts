import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, validatePassword } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = await this.userRepository.create({
      username,
      salt,
      password: await this.hashPassword(password, salt),
    });
    try {
      return this.userRepository.save(user);
    } catch (e) {
      if (e.code === 11000) { // duplicate username
        throw new ConflictException('Username already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    if (!await validatePassword(password, user.password, user.salt)) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken =  await this.jwtService.sign({ username });
    return { accessToken };
  }
}