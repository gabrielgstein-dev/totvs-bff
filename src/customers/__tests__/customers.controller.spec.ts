import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { BadRequestException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer with valid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: '12345678909',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(customerDto)).toEqual(result);
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

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(customerDto)).toEqual(result);
  });

  it('should return all customers', async () => {
    const result: CustomerEntity[] = [
      {
        id: 1,
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '123456789',
        address: '123 Test St',
        cpf: '12345678909',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return a single customer', async () => {
    const result: CustomerEntity = {
      id: 1,
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: '12345678909',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
  });

  it('should update a customer with valid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Updated Customer',
      email: 'updated@example.com',
      phone: '987654321',
      address: '456 Updated St',
      cpf: '12345678909',
    };

    const result: CustomerEntity = {
      id: 1,
      ...customerDto,
    };

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', customerDto)).toEqual(result);
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

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', customerDto)).toEqual(result);
  });

  it('should delete a customer', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    expect(await controller.remove('1')).toBeUndefined();
  });

  it('should throw an error for invalid CPF', async () => {
    const customerDto: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Test St',
      cpf: 'invalid',
    };

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new BadRequestException('Invalid CPF'));

    await expect(controller.create(customerDto)).rejects.toThrow(
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

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new BadRequestException('Invalid CNPJ'));

    await expect(controller.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
