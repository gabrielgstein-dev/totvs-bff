import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from '../contracts.controller';
import { ContractsService } from '../contracts.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { ContractsEntity } from '../entities/contracts.entity';

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

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(contractDto)).toEqual(result);
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

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
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

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
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

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', contractDto)).toEqual(result);
  });

  it('should delete a contract', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    expect(await controller.remove('1')).toBeUndefined();
  });
});
