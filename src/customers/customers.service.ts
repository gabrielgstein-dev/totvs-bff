import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerStatus } from '../common/enums/customer-status.enum';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.customersRepository.find();
  }

  async findAllWithFilters(status?: CustomerStatus): Promise<CustomerEntity[]> {
    let query = this.customersRepository.createQueryBuilder('customer');

    if (status) {
      query = query.where('customer.status = :status', { status });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return this.customersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    await this.customersRepository.update(id, createCustomerDto);
    return this.customersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
