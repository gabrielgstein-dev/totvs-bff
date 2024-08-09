import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsCpfOrCnpj } from '../../common/validators/is-cpf-or-cnpj.decorator';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

export class CreateCustomerDto implements ICreateCustomerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsOptional()
  @IsCpfOrCnpj()
  readonly cpf?: string;

  @IsOptional()
  @IsCpfOrCnpj()
  readonly cnpj?: string;

  constructor(data: ICreateCustomerDto) {
    this.name = data.name;
    this.phone = data.phone;
    this.cpf = data.cpf;
    this.cnpj = data.cnpj;
  }
}
