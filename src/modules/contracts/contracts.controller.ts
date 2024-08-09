import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractEntity } from './entities/contract.entity';

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @ApiOperation({ summary: 'Create a new contract' })
  @ApiBody({ type: CreateContractDto })
  @Post()
  async create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.contractsService.create(createContractDto);
  }

  @ApiOperation({ summary: 'Get all contracts of a customer' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @Get('/user/:id')
  async findAll(@Param('id') id: string): Promise<ContractEntity[]> {
    return this.contractsService.findAll(+id);
  }

  @ApiOperation({ summary: 'Get a specific contract' })
  @ApiParam({ name: 'id', required: true, description: 'Contract ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContractEntity> {
    return this.contractsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a contract information' })
  @ApiParam({ name: 'id', required: true, description: 'Contract ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Customer ID' })
  @Put(':id/user/:userId')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() createContractDto: CreateContractDto,
  ): Promise<number> {
    return this.contractsService.update(+userId, +id, createContractDto);
  }

  @ApiOperation({ summary: 'Makes a logical deletion in current contract' })
  @ApiParam({ name: 'id', required: true, description: 'Contract ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Customer ID' })
  @Delete(':id/:userId/cancel')
  async cancel(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<ContractEntity> {
    return this.contractsService.cancel(+userId, +id);
  }
}
