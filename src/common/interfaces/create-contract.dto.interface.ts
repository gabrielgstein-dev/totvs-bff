import { ContractStatus } from '../enums/contract-status.enum';

export interface ICreateContractDto {
  number: string;
  acquisitionDate: string;
  value: number;
  status: ContractStatus;
  customerId?: number;
}
