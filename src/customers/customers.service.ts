import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ContractStatus } from '../common/enums/contract-status.enum';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll(status?: ContractStatus): Promise<CustomerEntity[]> {
    const queryBuilder = this.customersRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.contracts', 'contract');

    if (status) {
      queryBuilder.where('contract.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({
      where: { id },
      relations: ['contracts'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer not found`);
    }

    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    await this.customersRepository.update(id, updateCustomerDto);
    const updatedCustomer = await this.customersRepository.findOneBy({ id });

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer not found`);
    }

    return updatedCustomer;
  }

  async remove(id: number): Promise<number> {
    const result = await this.customersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Customer not found`);
    }
    return result.affected;
  }
}
