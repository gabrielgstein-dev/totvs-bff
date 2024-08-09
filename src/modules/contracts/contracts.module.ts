import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './entities/contract.entity';
import { ContractsService } from './contracts.service';
import { CustomerEntity } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, CustomerEntity])],
  providers: [ContractsService],
})
export class ContractsModule {}
