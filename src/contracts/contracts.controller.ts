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
  create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  findAll(): Promise<ContractEntity[]> {
    return this.contractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContractEntity> {
    return this.contractsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.contractsService.update(+id, createContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contractsService.remove(+id);
  }
}
