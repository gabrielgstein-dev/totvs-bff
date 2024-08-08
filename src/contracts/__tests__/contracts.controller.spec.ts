import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from '../contracts.controller';
import { ContractsService } from '../contracts.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { ContractEntity } from '../entities/contract.entity';

describe('ContractsController', () => {
  let controller: ContractsController;
  let service: ContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [
        {
          provide: ContractsService,
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

    controller = module.get<ContractsController>(ContractsController);
    service = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(contractDto)).toEqual(result);
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

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
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

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
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

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', contractDto)).toEqual(result);
  });

  it('should delete a contract', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    expect(await controller.remove('1')).toBeUndefined();
  });
});
