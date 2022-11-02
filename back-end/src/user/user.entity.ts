import { Entity, Column,ObjectIdColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @Expose()
  @Column()
  password: string;
}