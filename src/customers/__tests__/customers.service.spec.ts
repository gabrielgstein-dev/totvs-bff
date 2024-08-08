import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from '../customers.service';
import { CustomerEntity } from '../entities/customer.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { BadRequestException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer with valid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: '11144477735',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(customerDto)).toEqual(result);
  });

  it('should create a customer with valid CNPJ', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cnpj: '12345678000195',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(customerDto)).toEqual(result);
  });

  it('should throw an error for invalid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: 'invalid',
    };

    await expect(service.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for invalid CNPJ', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cnpj: 'invalid',
    };

    await expect(service.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return all customers', async () => {
    const result: CustomerEntity[] = [
      {
        id: 1,
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '123456789',
        address: '123 Test St',
        cpf: '11144477735',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should return a single customer', async () => {
    const result: CustomerEntity = {
      id: 1,
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: '11144477735',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.findOne(1)).toEqual(result);
  });

  it('should update a customer with valid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Updated Customer',
      email: 'updated@example.com',
      phone: '987654321',
      address: '456 Updated St',
      cpf: '11144477735',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.update(1, customerDto)).toEqual(result);
  });

  it('should update a customer with valid CNPJ', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Updated Customer',
      email: 'updated@example.com',
      phone: '987654321',
      address: '456 Updated St',
      cnpj: '12345678000195',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.update(1, customerDto)).toEqual(result);
  });

  it('should throw an error when updating with invalid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Updated Customer',
      email: 'updated@example.com',
      phone: '987654321',
      address: '456 Updated St',
      cpf: 'invalid',
    };

    await expect(service.update(1, customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error when updating with invalid CNPJ', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Updated Customer',
      email: 'updated@example.com',
      phone: '987654321',
      address: '456 Updated St',
      cnpj: 'invalid',
    };

    await expect(service.update(1, customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete a customer', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

    expect(await service.remove(1)).toBeUndefined();
  });
});
