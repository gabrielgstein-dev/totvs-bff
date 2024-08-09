import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ContractStatus } from '../common/enums/contract-status.enum';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractsRepository: Repository<ContractEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<ContractEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createContractDto.customer,
    });

    if (!customer) {
      throw new BadRequestException('Error creating contract');
    }

    const contract = this.contractsRepository.create({
      ...createContractDto,
      customer,
    });
    return this.contractsRepository.save(contract);
  }

  async findAll(customerId: number): Promise<ContractEntity[]> {
    return this.contractsRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async findOne(id: number): Promise<ContractEntity> {
    const contract = await this.contractsRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!contract) {
      throw new NotFoundException(`Error trying to find contract`);
    }

    return contract;
  }

  async update(
    customerId: number,
    id: number,
    updateContractDto: CreateContractDto,
  ): Promise<number> {
    const existingContract = await this.contractsRepository.findOne({
      where: { id, customer: { id: customerId } },
      relations: ['customer'],
    });

    if (!existingContract) {
      throw new NotFoundException(`Error when trying to update the contract`);
    }

    const updatedContract = await this.contractsRepository.update(id, {
      ...updateContractDto,
      customer: existingContract.customer,
    });

    if (!updatedContract) {
      throw new NotFoundException(`Error when trying to update the contract`);
    }

    return updatedContract.affected;
  }

  async cancel(customerId: number, id: number): Promise<ContractEntity> {
    const contract = await this.contractsRepository.findOne({
      where: { id, customer: { id: customerId } },
      relations: ['customer'],
    });

    if (!contract) {
      throw new NotFoundException(`Contract not found`);
    }

    contract.status = ContractStatus.CANCELED;
    await this.contractsRepository.save(contract);

    return contract;
  }
}
