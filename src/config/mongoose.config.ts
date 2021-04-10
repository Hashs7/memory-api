import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModuleAsyncOptions} from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const user = configService.get('MONGO_USER');
        const password = configService.get('MONGO_PASSWORD');
        let uri = 'mongodb://';
        if (user && password) {
            uri = `mongodb+srv://${user}:${password}@`;
        }
        uri += `${configService.get('MONGO_HOST')}/${configService.get('MONGO_DATABASE')}`;

        return {
            uri,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    },
};
