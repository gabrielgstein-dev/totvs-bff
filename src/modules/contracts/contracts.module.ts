import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './entities/contract.entity';
import { ContractsService } from './contracts.service';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, CustomerEntity])],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
