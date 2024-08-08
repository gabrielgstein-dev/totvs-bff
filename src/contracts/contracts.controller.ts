import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractEntity } from './entities/contract.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.contractsService.create(createContractDto);
  }

  @Get('/user/:id')
  async findAll(@Param('id') id: string): Promise<ContractEntity[]> {
    return this.contractsService.findAll(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContractEntity> {
    return this.contractsService.findOne(+id);
  }

  @Put(':id/user/:userId')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() createContractDto: CreateContractDto,
  ): Promise<number> {
    return this.contractsService.update(+userId, +id, createContractDto);
  }

  @Delete(':id/:userId/cancel')
  async cancel(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<ContractEntity> {
    return this.contractsService.cancel(+userId, +id);
  }
}
