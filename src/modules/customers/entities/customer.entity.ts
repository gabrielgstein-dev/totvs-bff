import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ContractEntity } from '../../contracts/entities/contract.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true, nullable: true })
  cpf?: string;

  @Column({ unique: true, nullable: true })
  cnpj?: string;

  @OneToMany(() => ContractEntity, (contract) => contract.customer)
  contracts: ContractEntity[];
}
