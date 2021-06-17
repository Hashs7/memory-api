import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { File } from '../file/file.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Memory } from './memory/memory.schema';
import { IsArray } from 'class-validator';
import { Exclude } from 'class-transformer';
import { OldOwner } from './oldowner/oldowner.schema';

@Schema()
export class Instrument extends Document {
  @Prop({ required: true })
  id: string;

  @Prop()
  @ApiProperty({
    example: 'Gibson',
    description: "Marque de l'instrument",
  })
  brand: string;

  @Prop()
  @ApiProperty({
    example: 'Gibson SG Standard HC',
    description: "Nom du model de l'instrument",
  })
  modelName: string;

  @Prop()
  @ApiProperty({
    description: "Liste des couleurs de l'instrument",
  })
  colors: string[];

  @Prop()
  @ApiProperty({
    description: "Date d'obtention de l'instrument (mois prêt)",
  })
  buyDate: Date;

  @Prop()
  @ApiProperty({
    description: 'Date de la prochaine passation',
  })
  nextHandoverDate: Date;

  @Prop()
  @ApiProperty({
    description: 'Date de dernière passation',
  })
  lastHandoverDate: Date;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: File.name,
    required: false,
  })
  @ApiProperty({ type: File })
  images: File[];

  @Prop()
  @ApiProperty({
    description: "Surnom de l'instrument",
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: "Infos supplémentaires de l'instrument",
  })
  description: string;

  @Prop({
    default: false,
  })
  @ApiProperty({
    description: "L'instrument est à vendre ?",
  })
  forSale: boolean;

  @Prop()
  @ApiProperty({
    example: 'Guitare',
    description: "Type d'instrument",
  })
  type: string;

  @Prop()
  @ApiProperty({
    example: 'Micros Seymour Duncan',
    description: 'Types de finitions et modifications',
  })
  specification: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: File.name,
    required: false,
  })
  @ApiProperty({ type: File })
  sonority: File;

  @Prop()
  @ApiProperty({
    example: 'Jazz et Rock',
    description: 'Type de musique préférée',
  })
  musicStyle: string;

  @Prop()
  @ApiProperty({
    example: 'Quasi neuf',
    description: "Etat de l'instrument",
  })
  status: string;

  @Prop()
  createdAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @ApiProperty({ type: User })
  owner: User;

  @IsArray()
  @Prop([OldOwner])
  @ApiProperty({
    type: [OldOwner],
  })
  oldOwnersUser: OldOwner[];

  @IsArray()
  @Prop()
  @ApiProperty()
  oldOwners: [
    {
      user: {
        firstName: string;
        lastName: string;
      };
      from: Date;
      to: Date;
    },
  ];

  @IsArray()
  @Prop([Memory])
  @ApiProperty({
    type: [Memory],
  })
  memories: Memory[];

  @Prop()
  @Exclude()
  handoverToken: string;

  @Prop()
  @Exclude()
  handoverExpire: Date;
}

export interface OldOwnerInterface {
  user: {
    firstName;
    lastName;
  };
  from;
  to;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
