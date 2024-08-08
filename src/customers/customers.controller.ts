import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

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
  async findAll(): Promise<CustomerEntity[]> {
    return this.customersService.findAll();
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
  async remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}
