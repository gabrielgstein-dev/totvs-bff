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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { ContractStatus } from '../common/enums/contract-status.enum';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.create(createCustomerDto);
  }

  @ApiOperation({
    summary: 'Get all customers, optionally filter by contract status',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ContractStatus,
    description: 'Filter customers by contract status',
  })
  @Get()
  async findAll(
    @Query('status') status?: ContractStatus,
  ): Promise<CustomerEntity[]> {
    return this.customersService.findAll(status);
  }

  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @ApiBody({ type: CreateCustomerDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.update(+id, createCustomerDto);
  }

  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.customersService.remove(+id);
  }
}
