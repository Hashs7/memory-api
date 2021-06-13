import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { FileService } from '../file/file.service';
import { File, FileSchema } from '../file/file.schema';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    FileModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports: [UserService],
})
export class UserModule {}
