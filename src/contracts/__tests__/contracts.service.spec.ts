import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContractsService } from '../contracts.service';
import { ContractEntity } from '../entities/contract.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateContractDto } from '../dto/create-contract.dto';

describe('ContractsService', () => {
  let service: ContractsService;
  let repository: Repository<ContractEntity>;

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
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContractsService>(ContractsService);
    repository = module.get<Repository<ContractEntity>>(
      getRepositoryToken(ContractEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contract', async () => {
    const contractDto: CreateContractDto = {
      name: 'Contract Name',
      description: 'Contract Description',
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2024-12-31T00:00:00.000Z',
      client: 'Client Name',
      value: 1000,
      status: 'Active',
    };

    const result: ContractEntity = {
      id: 1,
      name: contractDto.name,
      description: contractDto.description,
      startDate: new Date(contractDto.startDate),
      endDate: new Date(contractDto.endDate),
      client: contractDto.client,
      value: contractDto.value,
      status: contractDto.status,
    };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(contractDto)).toEqual(result);
  });

  it('should return all contracts', async () => {
    const result: ContractEntity[] = [
      {
        id: 1,
        name: 'Contract Name',
        description: 'Contract Description',
        startDate: new Date('2024-01-01T00:00:00.000Z'),
        endDate: new Date('2024-12-31T00:00:00.000Z'),
        client: 'Client Name',
        value: 1000,
        status: 'Active',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should return a single contract', async () => {
    const result: ContractEntity = {
      id: 1,
      name: 'Contract Name',
      description: 'Contract Description',
      startDate: new Date('2024-01-01T00:00:00.000Z'),
      endDate: new Date('2024-12-31T00:00:00.000Z'),
      client: 'Client Name',
      value: 1000,
      status: 'Active',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.findOne(1)).toEqual(result);
  });

  it('should update a contract', async () => {
    const contractDto: CreateContractDto = {
      name: 'Updated Contract Name',
      description: 'Updated Contract Description',
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2024-12-31T00:00:00.000Z',
      client: 'Updated Client Name',
      value: 2000,
      status: 'Inactive',
    };

    const result: ContractEntity = {
      id: 1,
      name: contractDto.name,
      description: contractDto.description,
      startDate: new Date(contractDto.startDate),
      endDate: new Date(contractDto.endDate),
      client: contractDto.client,
      value: contractDto.value,
      status: contractDto.status,
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.update(1, contractDto)).toEqual(result);
  });

  it('should delete a contract', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

    expect(await service.remove(1)).toBeUndefined();
  });
});
