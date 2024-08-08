import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContractEntity {
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
