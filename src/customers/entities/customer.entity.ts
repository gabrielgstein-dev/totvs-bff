import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerStatus } from '../../common/enums/customer-status.enum';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  cnpj?: string;

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.DENTRO_DO_PRAZO,
  })
  status: CustomerStatus;
}
