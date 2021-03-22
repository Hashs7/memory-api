import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instrument])
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService]
})
export class InstrumentModule {}
