import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
