import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeUser } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  type: `${TypeUser}`;
}
