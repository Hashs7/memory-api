import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  sender: string;

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
