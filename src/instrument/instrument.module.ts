import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './instrument.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
