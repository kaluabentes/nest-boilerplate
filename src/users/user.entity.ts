import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
