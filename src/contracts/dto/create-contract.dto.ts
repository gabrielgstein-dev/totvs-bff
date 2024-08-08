import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  readonly startDate: string;

  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;

  @IsNotEmpty()
  @IsString()
  readonly client: string;

  @IsNotEmpty()
  @IsNumber()
  readonly value: number;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  constructor(
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    client: string,
    value: number,
    status: string,
  ) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.client = client;
    this.value = value;
    this.status = status;
  }
}
