import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
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
  @Column(() => User)
  users: string[];

  @Column(() => Message)
  messages: Message[];
}
