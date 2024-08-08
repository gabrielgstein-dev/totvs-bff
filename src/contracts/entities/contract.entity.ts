import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CustomerEntity } from '../../customers/entities/customer.entity';
import { ContractStatus } from '../../common/enums/contract-status.enum';

@Entity('contracts')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  acquisitionDate: string;

  @Column()
  value: number;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.ON_SCHEDULE,
  })
  status: ContractStatus;

  @ManyToOne(() => CustomerEntity, (customer) => customer.contracts, {
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;
}
