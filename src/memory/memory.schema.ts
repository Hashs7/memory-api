import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types, Document } from 'mongoose';
import { CreateMemoryDto } from './dto/create-memory.dto';

export enum MemoryType {
  Concert = 'Concert',
  Rehearsal = 'Rehearsal',
}

// @Schema({ timestamps: true, _id: false })
@Schema()
export class Memory extends Document  {
// export class Memory extends Types.Subdocument  {
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
    required: true,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type: string;

/*
  @Prop({
    type: String,
    enum: Object.values(MemoryType),
    required: true,
  })
  @ApiProperty({
    enum: Object.values(MemoryType),
  })
  type: string;*/

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({
    type: User
  })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: User.name,
    required: false,
  })
  @ApiProperty({
    type: [User]
  })
  withUsers?: MongooseSchema.Types.ObjectId[];

  @Prop()
  media?: string[];

  constructor(
    createMemoryDto: CreateMemoryDto,
    createdBy: MongooseSchema.Types.ObjectId,
    withUsers:MongooseSchema.Types.ObjectId[]
  ) {
    super();
    this.name = createMemoryDto.name;
    this.description = createMemoryDto.description;
    this.date = createMemoryDto.date;
    this.type = createMemoryDto.type;
    this.createdBy = createdBy;
    this.withUsers = withUsers;
    this.media = createMemoryDto.media;
    /*Object.keys(createMemoryDto)
      .map((key, value) => this[key] = value);*/
  }
}

export const MemorySchema = SchemaFactory.createForClass(Memory);
