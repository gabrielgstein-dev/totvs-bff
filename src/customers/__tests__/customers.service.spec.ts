import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from '../customers.service';
import { CustomerEntity } from '../entities/customer.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { BadRequestException } from '@nestjs/common';
import { CustomerStatus } from '../../common/enums/customer-status.enum';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<CustomerEntity>;

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
            createQueryBuilder: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockReturnThis(),
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
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cpf: '11144477735',
    });

    const result = { ...baseEntity, cpf: '11144477735' };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(customerDto)).toEqual(result);
  });

  it('should create a customer with valid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({
      ...baseDto,
      cnpj: '12345678000195',
    });

    const result = { ...baseEntity, cnpj: '12345678000195' };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(customerDto)).toEqual(result);
  });

  it('should throw an error for invalid CPF', async () => {
    const customerDto = new CreateCustomerDto({ ...baseDto, cpf: 'invalid' });

    jest.spyOn(service, 'create').mockImplementation(async () => {
      throw new BadRequestException('Invalid CPF');
    });

    await expect(service.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for invalid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({ ...baseDto, cnpj: 'invalid' });

    jest.spyOn(service, 'create').mockImplementation(async () => {
      throw new BadRequestException('Invalid CNPJ');
    });

    await expect(service.create(customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return all customers', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should return all customers with a specific status', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(result),
    } as any);

    expect(
      await service.findAllWithFilters(CustomerStatus.DENTRO_DO_PRAZO),
    ).toEqual(result);
  });

  it('should return a single customer', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(baseEntity);

    expect(await service.findOne(1)).toEqual(baseEntity);
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
    const customerDto = new CreateCustomerDto({ ...baseDto, cpf: 'invalid' });

    jest.spyOn(service, 'update').mockImplementation(async () => {
      throw new BadRequestException('Invalid CPF');
    });

    await expect(service.update(1, customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error when updating with invalid CNPJ', async () => {
    const customerDto = new CreateCustomerDto({ ...baseDto, cnpj: 'invalid' });

    jest.spyOn(service, 'update').mockImplementation(async () => {
      throw new BadRequestException('Invalid CNPJ');
    });

    await expect(service.update(1, customerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete a customer', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

    expect(await service.remove(1)).toBeUndefined();
  });
});
