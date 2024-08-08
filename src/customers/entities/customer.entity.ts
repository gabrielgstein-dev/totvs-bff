import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
