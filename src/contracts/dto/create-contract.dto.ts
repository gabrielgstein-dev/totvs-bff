export class CreateContractDto {
  readonly name: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly client: string;
  readonly value: number;
  readonly status: string;
}
