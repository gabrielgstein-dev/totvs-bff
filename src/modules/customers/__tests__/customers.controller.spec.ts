import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { ContractStatus } from '../../common/enums/contract-status.enum';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const baseDto = {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '123456789',
    address: '123 Test St',
    cpf: '11144477735',
  };

  const baseEntity: CustomerEntity = {
    id: 1,
    ...baseDto,
    contracts: [
      {
        id: 1,
        number: '12345',
        acquisitionDate: '2024-01-01T00:00:00.000Z',
        value: 1000,
        status: ContractStatus.ON_SCHEDULE,
        customer: null,
      },
    ],
  };

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

  it('should create a customer', async () => {
    const customerDto = new CreateCustomerDto(baseDto);

    jest.spyOn(service, 'create').mockResolvedValue(baseEntity);

    expect(await controller.create(customerDto)).toEqual(baseEntity);
  });

  it('should return all customers', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    const customers = await controller.findAll();
    expect(customers).toEqual(result);
  });

  it('should return customers with contracts of a specific status', async () => {
    const result: CustomerEntity[] = [baseEntity];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    const customers = await controller.findAll(ContractStatus.PAST_DUE);
    expect(customers).toEqual(result);
  });

  it('should return a single customer', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(baseEntity);

    expect(await controller.findOne('1')).toEqual(baseEntity);
  });

  it('should update a customer', async () => {
    const customerDto = new CreateCustomerDto(baseDto);

    jest.spyOn(service, 'update').mockResolvedValue(baseEntity);

    expect(await controller.update('1', customerDto)).toEqual(baseEntity);
  });

  it('should delete a customer', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(1);

    expect(await controller.remove('1')).toBe(1);
  });
});
