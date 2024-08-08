import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    if (createCustomerDto.cpf && !cpf.isValid(createCustomerDto.cpf)) {
      throw new BadRequestException('Invalid CPF');
    }

    if (createCustomerDto.cnpj && !cnpj.isValid(createCustomerDto.cnpj)) {
      throw new BadRequestException('Invalid CNPJ');
    }

    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.customersRepository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return this.customersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    if (createCustomerDto.cpf && !cpf.isValid(createCustomerDto.cpf)) {
      throw new BadRequestException('Invalid CPF');
    }

    if (createCustomerDto.cnpj && !cnpj.isValid(createCustomerDto.cnpj)) {
      throw new BadRequestException('Invalid CNPJ');
    }

    await this.customersRepository.update(id, createCustomerDto);
    return this.customersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
