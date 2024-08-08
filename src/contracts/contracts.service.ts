import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractsEntity } from './entities/contracts.entity';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractsEntity)
    private contractsRepository: Repository<ContractsEntity>,
  ) {}

  create(createContractDto: CreateContractDto): Promise<ContractsEntity> {
    const contract = this.contractsRepository.create(createContractDto);
    return this.contractsRepository.save(contract);
  }

  findAll(): Promise<ContractsEntity[]> {
    return this.contractsRepository.find();
  }

  findOne(id: number): Promise<ContractsEntity> {
    return this.contractsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    createContractDto: CreateContractDto,
  ): Promise<ContractsEntity> {
    await this.contractsRepository.update(id, createContractDto);
    return this.contractsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.contractsRepository.delete(id);
  }
}
