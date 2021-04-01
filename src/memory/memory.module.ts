import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentModule } from '../instrument/instrument.module';
import { InstrumentService } from '../instrument/instrument.service';
import { Instrument, InstrumentSchema } from '../instrument/instrument.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { Memory, MemorySchema } from './memory.schema';

@Module({
  imports: [
    InstrumentModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Memory.name, schema: MemorySchema },
      { name: User.name, schema: UserSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [MemoryController],
  providers: [MemoryService, InstrumentService, UserService],
})
export class MemoryModule {}
