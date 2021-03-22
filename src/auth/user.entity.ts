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
  password: string;

  @Column()
  salt: string;
}


export const validatePassword = async (password: string, userPassword: string, userSalt: string): Promise<boolean> => {
  const hash = await bcrypt.hash(password, userSalt);
  console.log(hash, userPassword, hash === userPassword);
  return hash === userPassword;
};