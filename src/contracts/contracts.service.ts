import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractsRepository: Repository<ContractEntity>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<ContractEntity> {
    const contract = this.contractsRepository.create(createContractDto);
    return this.contractsRepository.save(contract);
  }

  async findAll(): Promise<ContractEntity[]> {
    return this.contractsRepository.find();
  }

  async findOne(id: number): Promise<ContractEntity> {
    return this.contractsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    await this.contractsRepository.update(id, createContractDto);
    return this.contractsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.contractsRepository.delete(id);
  }
}
