import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers.service';
import { CustomerEntity } from '../entities/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ContractStatus } from '../../common/enums/contract-status.enum';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<CustomerEntity>;

  const mockCustomerEntity: CustomerEntity = {
    id: 1,
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '123456789',
    address: '123 Test St',
    contracts: [],
  };

  const mockCreateCustomerDto: CreateCustomerDto = new CreateCustomerDto({
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '123456789',
    address: '123 Test St',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn().mockReturnValue(mockCustomerEntity),
            save: jest.fn().mockResolvedValue(mockCustomerEntity),
            findOne: jest.fn().mockResolvedValue(mockCustomerEntity),
            findOneBy: jest.fn().mockResolvedValue(mockCustomerEntity),
            update: jest.fn().mockResolvedValue(mockCustomerEntity),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            createQueryBuilder: jest.fn(() => ({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([mockCustomerEntity]),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  it('should create a new customer', async () => {
    const result = await service.create(mockCreateCustomerDto);
    expect(result).toEqual(mockCustomerEntity);
    expect(repository.create).toHaveBeenCalledWith(mockCreateCustomerDto);
    expect(repository.save).toHaveBeenCalledWith(mockCustomerEntity);
  });

  it('should return all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCustomerEntity]);
    expect(repository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should return customers filtered by contract status', async () => {
    const result = await service.findAll(ContractStatus.ON_SCHEDULE);
    expect(result).toEqual([mockCustomerEntity]);
    expect(repository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should return a single customer', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockCustomerEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['contracts'],
    });
  });

  it('should throw an error if customer is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a customer', async () => {
    const result = await service.update(1, mockCreateCustomerDto);
    expect(result).toEqual(mockCustomerEntity);
    expect(repository.update).toHaveBeenCalledWith(1, mockCreateCustomerDto);
  });

  it('should throw an error if customer not found during update', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
    await expect(service.update(1, mockCreateCustomerDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a customer', async () => {
    await expect(service.remove(1)).resolves.not.toThrow();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw an error if customer not found during deletion', async () => {
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 0, raw: [] });
    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
