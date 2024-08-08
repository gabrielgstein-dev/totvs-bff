import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { ContractStatus } from '../common/enums/contract-status.enum';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  async findAll(
    @Query('status') status?: ContractStatus,
  ): Promise<CustomerEntity[]> {
    return this.customersService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customersService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.update(+id, createCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.customersService.remove(+id);
  }
}
