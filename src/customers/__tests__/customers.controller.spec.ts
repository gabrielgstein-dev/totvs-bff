import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { BadRequestException } from '@nestjs/common';
import { CustomerStatus } from '../../common/enums/customer-status.enum';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const baseDto: ICreateCustomerDto = {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '123456789',
    address: '123 Test St',
    status: CustomerStatus.DENTRO_DO_PRAZO,
  };

  const baseEntity: CustomerEntity = {
    id: 1,
    ...baseDto,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn(),
            findAllWithFilters: jest.fn(),
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
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cpf: '11144477735',
    });

    const result = { ...baseEntity, cpf: '11144477735' };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(customerDto)).toEqual(result);
  });

  it('should create a customer with valid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cnpj: '12345678000195',
    });

    const result = { ...baseEntity, cnpj: '12345678000195' };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(customerDto)).toEqual(result);
  });

  it('should return all customers', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(service, 'findAllWithFilters').mockResolvedValue(result);

    const customers = await controller.findAll();
    expect(customers).toEqual(result);
  });

  it('should return all customers with a specific status', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(service, 'findAllWithFilters').mockResolvedValue(result);

    expect(await controller.findAll(CustomerStatus.DENTRO_DO_PRAZO)).toEqual(
      result,
    );
  });

  it('should return a single customer', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(baseEntity);

    expect(await controller.findOne('1')).toEqual(baseEntity);
  });

  it('should update a customer with valid CPF', async () => {
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cpf: '11144477735',
      status: CustomerStatus.PAGO,
    });

    const result = {
      ...baseEntity,
      cpf: '11144477735',
      status: CustomerStatus.PAGO,
    };

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', customerDto)).toEqual(result);
  });

  it('should update a customer with valid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cnpj: '12345678000195',
      status: CustomerStatus.PAGO,
    });

    const result = {
      ...baseEntity,
      cnpj: '12345678000195',
      status: CustomerStatus.PAGO,
    };

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', customerDto)).toEqual(result);
  });

  it('should delete a customer', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
  });

  it('should throw an error for invalid CPF', async () => {
    const customerDto = new CreateCustomerDto({ ...baseDto, cpf: 'invalid' });

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new BadRequestException('Invalid CPF'));

    await expect(controller.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for invalid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({ ...baseDto, cnpj: 'invalid' });

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new BadRequestException('Invalid CNPJ'));

    await expect(controller.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
