import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsEntity } from './entities/contracts.entity';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractsEntity])],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
