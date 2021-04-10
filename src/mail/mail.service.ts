import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const baseUrl = this.configService.get('APP_BASE_URL');
    const url = `${baseUrl}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenue sur Memory Motel ! Confirme ton email',
      template: 'confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }

  async sendResetPassword(user: User, token: string) {
    const baseUrl = this.configService.get('APP_BASE_URL');
    const url = `${baseUrl}/auth/reset?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Réinitialiser votre mot de passe',
      template: 'reset-password',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
