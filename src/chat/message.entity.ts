import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import {User} from "../user/user.schema";

export class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column(() => User)
  sender: User;

  @Column()
  text: string;

  @Column()
  createdAd: Date;

  constructor(sender, text) {
    this.sender = sender;
    this.text = text;
    this.createdAd = new Date(Date.now());
  }
}
