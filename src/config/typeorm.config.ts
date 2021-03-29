import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Instrument } from '../instrument/entities/instrument.entity';
import { User } from '../user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Conversation } from '../chat/conversation.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  // entities: [__dirname + '/../**/*.entity.ts'],

  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mongodb',
    host: configService.get('TYPEORM_HOST'),
    port: configService.get('TYPEORM_PORT'),
    url: configService.get('TYPEORM_URL'),
    database: configService.get('TYPEORM_DATABASE'),
    ...configService.get('TYPEORM_URL') && { url: configService.get('TYPEORM_URL') },
    // username: configService.get('TYPEORM_USERNAME'),
    // password: configService.get('TYPEORM_PASSWORD'),
    entities: [
      Instrument,
      User,
      Conversation,
      // '/**/entities/*.entity.ts',
      // '/**/*.entity.ts',
    ],
    useUnifiedTopology: true,
    synchronize: true,
  }),
};
