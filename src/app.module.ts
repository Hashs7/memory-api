import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { InstrumentModule } from './instrument/instrument.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    InstrumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
