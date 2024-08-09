import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './modules/contracts/entities/contract.entity';
import { ContractsService } from './modules/contracts/contracts.service';
import { ContractsController } from './modules/contracts/contracts.controller';
import { CustomerEntity } from './modules/customers/entities/customer.entity';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity, CustomerEntity]),
    CustomersModule,
  ],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
