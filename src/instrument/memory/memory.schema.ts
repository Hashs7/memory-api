import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types, Document } from 'mongoose';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { User } from '../../user/user.schema';
import { IsArray } from 'class-validator';
import { MemoryContent } from './content/content.schema';

export enum MemoryType {
  Concert = 'Concert',
  Rehearsal = 'Rehearsal',
}

// @Schema()
// export class Memory extends Document  {
// @Schema({ timestamps: true, _id: false })
@Schema({ timestamps: true })
export class Memory extends Types.Subdocument {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ type: Date })
  @ApiProperty()
  date: Date;

  @Prop({
    required: false,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type?: string;

  /*
  @Prop({
    type: String,
    enum: Object.values(MemoryType),
    required: true,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type: string;
  */

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({
    type: User,
  })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
    required: false,
  })
  @ApiProperty({
    type: [User],
  })
  withUsers?: MongooseSchema.Types.ObjectId[];

  @Prop()
  media?: string[];

  @IsArray()
  @Prop([MemoryContent])
  @ApiProperty({
    type: [MemoryContent],
  })
  contents: MemoryContent[];

  constructor(
    createMemoryDto: CreateMemoryDto,
    createdBy: MongooseSchema.Types.ObjectId,
    withUsers: MongooseSchema.Types.ObjectId[],
  ) {
    super();
    this.name = createMemoryDto.name;
    this.description = createMemoryDto.description;
    console.log(createMemoryDto.name);
    console.log('dtooo', createMemoryDto);
    this.date = createMemoryDto.date;
    this.type = createMemoryDto.type;
    this.createdBy = createdBy;
    this.withUsers = withUsers;
    this.contents = createMemoryDto.contents;
    /*Object.keys(createMemoryDto)
          .map((key, value) => this[key] = value);*/
  }
}

export const MemorySchema = SchemaFactory.createForClass(Memory);
