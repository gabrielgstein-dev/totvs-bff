import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contracts/entities/contract.entity';
import { ContractsService } from './contracts/contracts.service';
import { ContractsController } from './contracts/contracts.controller';
import { CustomerEntity } from './customers/entities/customer.entity';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity, CustomerEntity]),
    CustomersModule,
  ],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
