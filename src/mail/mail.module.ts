import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {join} from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

// transport: 'smtps://user@example.com:topsecret@smtp.example.com',
// or
@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: 'smtp-relay.sendinblue.com',
                    secure: false,
                    auth: {
                        user: configService.get('SENDINBLUE_USER'),
                        pass: configService.get('SENDINBLUE_PASSWORD'),
                    },
                },
                defaults: {
                    from: '"No Reply" <contact@sebhernoux.me>',
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            })
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
