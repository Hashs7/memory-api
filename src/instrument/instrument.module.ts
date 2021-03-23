import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';
import { CreateInstrumentDto } from './dto/create-instrument.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instrument]),
   /* NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([Instrument])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: CreateInstrumentDto, EntityClass: Instrument }],
    }),*/
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService]
})
export class InstrumentModule {}
