import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContractsService } from '../contracts.service';
import { ContractsEntity } from '../entities/contracts.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateContractDto } from '../dto/create-contract.dto';

describe('ContractsService', () => {
  let service: ContractsService;
  let repository: Repository<ContractsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        {
          provide: getRepositoryToken(ContractsEntity),
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
    repository = module.get<Repository<ContractsEntity>>(
      getRepositoryToken(ContractsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contract', async () => {
    const contractDto: CreateContractDto = {
      name: 'Test Contract',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      client: 'Test Client',
      value: 1000,
      status: 'active',
    };

    const result: ContractsEntity = {
      id: 1,
      ...contractDto,
    };

    jest.spyOn(repository, 'create').mockReturnValue(result);
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(contractDto)).toEqual(result);
  });

  it('should return all contracts', async () => {
    const result: ContractsEntity[] = [
      {
        id: 1,
        name: 'Test Contract',
        description: 'Test Description',
        startDate: new Date(),
        endDate: new Date(),
        client: 'Test Client',
        value: 1000,
        status: 'active',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should return a single contract', async () => {
    const result: ContractsEntity = {
      id: 1,
      name: 'Test Contract',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      client: 'Test Client',
      value: 1000,
      status: 'active',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.findOne(1)).toEqual(result);
  });

  it('should update a contract', async () => {
    const contractDto: CreateContractDto = {
      name: 'Updated Contract',
      description: 'Updated Description',
      startDate: new Date(),
      endDate: new Date(),
      client: 'Updated Client',
      value: 2000,
      status: 'updated',
    };

    const result: ContractsEntity = {
      id: 1,
      ...contractDto,
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
