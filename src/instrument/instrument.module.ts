import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './instrument.schema';
import { MemoryModule } from './memory/memory.module';
import { File, FileSchema } from '../file/file.schema';
import { FileService } from '../file/file.service';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { OldOwner, OldOwnerSchema } from './oldowner/oldowner.schema';

@Module({
  imports: [
    MemoryModule,
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: User.name, schema: UserSchema },
      { name: OldOwner.name, schema: OldOwnerSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService, FileService, UserService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
