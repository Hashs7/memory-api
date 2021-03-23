import { Column, Entity, ManyToMany, ObjectIdColumn } from 'typeorm';
import { User } from '../user/user.entity';

export class Message {
  @Column()
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