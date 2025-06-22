import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './Role';
import { Department } from './Department';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @ManyToOne(() => Role, { eager: true })
  role!: Role;

  @ManyToOne(() => Department, { eager: true })
  department!: Department;
}
