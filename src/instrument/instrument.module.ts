import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './instrument.schema';
import { MemoryModule } from './memory/memory.module';
import { File, FileSchema } from '../file/file.schema';

@Module({
  imports: [
    MemoryModule,
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
