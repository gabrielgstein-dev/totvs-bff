import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContractsService } from '../contracts.service';
import { ContractEntity } from '../entities/contract.entity';
import { CustomerEntity } from '../../customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from '../dto/create-contract.dto';
import { ContractStatus } from '../../common/enums/contract-status.enum';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ContractsService', () => {
  let service: ContractsService;
  let contractsRepository: Repository<ContractEntity>;
  let customersRepository: Repository<CustomerEntity>;

  const baseDto: CreateContractDto = {
    number: '12345',
    acquisitionDate: '2024-01-01T00:00:00.000Z',
    value: 1000,
    status: ContractStatus.ON_SCHEDULE,
    customer: 1,
  };

  const baseEntity: ContractEntity = {
    id: 1,
    ...baseDto,
    customer: { id: 1, name: 'Customer' } as CustomerEntity,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        {
          provide: getRepositoryToken(ContractEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContractsService>(ContractsService);
    contractsRepository = module.get<Repository<ContractEntity>>(
      getRepositoryToken(ContractEntity),
    );
    customersRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contract', async () => {
    jest
      .spyOn(customersRepository, 'findOneBy')
      .mockResolvedValue({ id: 1 } as any);
    jest.spyOn(contractsRepository, 'create').mockReturnValue(baseEntity);
    jest.spyOn(contractsRepository, 'save').mockResolvedValue(baseEntity);

    expect(await service.create(baseDto)).toEqual(baseEntity);
  });

  it('should throw an error if customer ID is invalid', async () => {
    jest.spyOn(customersRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.create(baseDto)).rejects.toThrow(BadRequestException);
  });

  it('should return all contracts for a customer', async () => {
    const result: ContractEntity[] = [baseEntity];
    jest.spyOn(contractsRepository, 'find').mockResolvedValue(result);

    expect(await service.findAll(1)).toEqual(result);
  });

  it('should return a single contract for a customer', async () => {
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(baseEntity);

    expect(await service.findOne(1)).toEqual(baseEntity);
  });

  it('should throw an error if contract not found', async () => {
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a contract for a customer', async () => {
    const updateResult = { affected: 1 };
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(baseEntity);
    jest
      .spyOn(contractsRepository, 'update')
      .mockResolvedValue(updateResult as any);

    expect(await service.update(1, 1, baseDto)).toEqual(updateResult.affected);
  });

  it('should throw an error if contract not found during update', async () => {
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(null);

    await expect(service.update(1, 1, baseDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should cancel a contract for a customer', async () => {
    const canceledContract = {
      ...baseEntity,
      status: ContractStatus.CANCELED,
    };
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(baseEntity);
    jest.spyOn(contractsRepository, 'save').mockResolvedValue(canceledContract);

    expect(await service.cancel(1, 1)).toEqual(canceledContract);
  });

  it('should throw an error if contract not found during cancellation', async () => {
    jest.spyOn(contractsRepository, 'findOne').mockResolvedValue(null);

    await expect(service.cancel(1, 1)).rejects.toThrow(NotFoundException);
  });
});
