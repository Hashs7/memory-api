import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    let uri = 'mongodb://';
    const user = configService.get('MONGO_USER');
    const password = configService.get('MONGO_PASSWORD');
    if (user && password) {
      uri += `${user}:${password}@`;
    }
    uri += `${configService.get('MONGO_HOST')}/${configService.get('MONGO_DATABASE')}`;
    return {
      uri,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  },
};
