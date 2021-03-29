import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    console.log(hash, this.password, hash === this.password);
    return hash === this.password;
  }
}
