import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    // host: configService.get('TYPEORM_HOST'),
    // port: configService.get('TYPEORM_PORT'),
    uri: configService.get('TYPEORM_URL'),
    // database: configService.get('TYPEORM_DATABASE'),
    // ...(configService.get('TYPEORM_URL') && {
    //   url: configService.get('TYPEORM_URL'),
    // }),
    // username: configService.get('TYPEORM_USERNAME'),
    // password: configService.get('TYPEORM_PASSWORD'),
    // entities: [
      // Instrument,
      // User,
      // Conversation,
      // '/**/entities/*.entity.ts',
      // '/**/*.entity.ts',
    // ],
    useUnifiedTopology: true,
    // synchronize: true,
  }),
};
