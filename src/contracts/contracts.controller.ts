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
import { ContractsEntity } from './entities/contracts.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractsEntity> {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  findAll(): Promise<ContractsEntity[]> {
    return this.contractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContractsEntity> {
    return this.contractsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractsEntity> {
    return this.contractsService.update(+id, createContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contractsService.remove(+id);
  }
}
