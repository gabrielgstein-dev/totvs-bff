import { IsNotEmpty, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { ContractStatus } from '../../common/enums/contract-status.enum';

export class CreateContractDto {
  @IsNotEmpty()
  readonly number: string;

  @IsDateString()
  readonly acquisitionDate: string;

  @IsNumber()
  readonly value: number;

  @IsEnum(ContractStatus)
  readonly status: ContractStatus;

  @IsNotEmpty()
  readonly customer: number;

  constructor(partial: Partial<CreateContractDto>) {
    Object.assign(this, partial);
  }
}
