import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {jwtConstants} from '../config/jwt.config';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from '../user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signUp(createUserDto: CreateUserDto, fileName: string) {
        const {email, password} = createUserDto;
        const exist = await this.userService.findUserbyEmail(email);

        if (exist) {
            throw new BadRequestException('email already taken');
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await this.hashPassword(password, salt);
        const user = await this.userService.createUser(
            createUserDto,
            fileName,
            salt,
            hashPassword,
        );
        return this.generateAuthSuccessResponse(user);
    }

    async signIn(authUserDTO: AuthCredentialsDto, hashed = false) {
        const user: User = await this.userService.findByUsernameOrEmail(
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

        this.userService.handleNewConnection(user);
        return this.generateAuthSuccessResponse(user);
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    decodeToken(accessToken: string) {
        return this.jwtService.decode(accessToken);
    }

    async generateAuthSuccessResponse(user: User, isRefresh = false) {
        console.log(`authService `, user);
        const payload = {
            username: user.username,
            email: user.email,
            // id: user.id,
        };
        const accessToken = await this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.sign(
            payload,
            jwtConstants.rSignOptions,
        );
        const decoded = this.decodeToken(accessToken);
        return {accessToken, refreshToken, data: decoded};
    }

    async refreshToken(accessToken: string) {
        const user: any = this.jwtService.decode(accessToken);
        if (!user) {
            throw new UnauthorizedException('user not found');
        }
        return await this.generateAuthSuccessResponse(user, true);
    }
}
