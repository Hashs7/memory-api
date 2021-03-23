import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from '../instrument/entities/instrument.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: configService.get('MONGO_PORT'),
        database: configService.get('MONGO_DB'),
        // username: configService.get('MONGO_USER'),
        // password: configService.get('MONGO_PASSWORD'),
        useUnifiedTopology: true,
        entities: [
          Instrument,
          User,
          // '/../**/entities/*.entity.ts',
        ],
        synchronize: true,
      })
    }),
  ]
})
export class DatabaseModule {}
