import {Column, Entity, JoinTable, ManyToMany, ObjectID, ObjectIdColumn} from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from './message.entity';

@Entity()
export class Conversation {

  @ObjectIdColumn()
  _id: ObjectID;
  /*
  @Column(() => User)
  users: User[];
  */
  @Column()
  users: ObjectID[];

  @Column(() => Message)
  messages: Message[]
}
