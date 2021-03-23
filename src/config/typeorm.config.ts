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
    host: configService.get('MONGO_HOST'),
    port: configService.get('MONGO_PORT'),
    database: configService.get('MONGO_DB'),
    // username: configService.get('MONGO_USER'),
    // password: configService.get('MONGO_PASSWORD'),
    entities: [
      Instrument,
      User,
      Conversation,
      // '/**/entities/*.entity.ts',
      // '/**/*.entity.ts',
    ],
    useUnifiedTopology: true,
    synchronize: true,
  })
};