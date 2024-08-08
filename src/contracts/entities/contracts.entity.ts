import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class ContractsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column()
  client: string;

  @Column('decimal')
  value: number;

  @Column()
  status: string;
}
