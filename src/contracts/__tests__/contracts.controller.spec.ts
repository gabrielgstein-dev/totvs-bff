import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from '../contracts.controller';
import { ContractsService } from '../contracts.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { ContractEntity } from '../entities/contract.entity';
import { ContractStatus } from '../../common/enums/contract-status.enum';

describe('ContractsController', () => {
  let controller: ContractsController;
  let service: ContractsService;

  const baseContractDto: CreateContractDto = {
    number: '12345',
    acquisitionDate: '2024-01-01T00:00:00.000Z',
    value: 1000,
    status: ContractStatus.ON_SCHEDULE,
    customer: 1,
  };

  const baseContractEntity: ContractEntity = {
    id: 1,
    ...baseContractDto,
    customer: { id: 1, name: 'Customer' } as any,
  };

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
            cancel: jest.fn(),
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
    jest.spyOn(service, 'create').mockResolvedValue(baseContractEntity);
    expect(await controller.create(baseContractDto)).toEqual(
      baseContractEntity,
    );
  });

  it('should return all contracts for a customer', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([baseContractEntity]);
    expect(await controller.findAll('1')).toEqual([baseContractEntity]);
  });

  it('should return a single contract', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(baseContractEntity);
    expect(await controller.findOne('1')).toEqual(baseContractEntity);
  });

  it('should update a contract', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(1);
    expect(await controller.update('1', '1', baseContractDto)).toEqual(1);
  });

  it('should cancel a contract', async () => {
    jest.spyOn(service, 'cancel').mockResolvedValue({
      ...baseContractEntity,
      status: ContractStatus.CANCELED,
    });
    expect(await controller.cancel('1', '1')).toEqual({
      ...baseContractEntity,
      status: ContractStatus.CANCELED,
    });
  });
});
