import { Column, Entity, ManyToMany, ObjectIdColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from './message.entity';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';

@Entity()
export class Conversation {

  @ObjectIdColumn()
  id: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column(() => Message)
  messages: Message[]
}