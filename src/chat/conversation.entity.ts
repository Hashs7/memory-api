import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Message } from './message.entity';
import {User} from "../user/user.schema";

@Entity()
export class Conversation {
  @ObjectIdColumn()
  _id: ObjectID;
  /*
  @Column(() => User)
  users: User[];
  */
  @Column(() => User)
  users: string[];

  @Column(() => Message)
  messages: Message[];
}
