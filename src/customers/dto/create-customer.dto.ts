import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { IsCpfOrCnpj } from '../../common/validators/is-cpf-or-cnpj.decorator';
import { CustomerStatus } from '../../common/enums/customer-status.enum';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

export class CreateCustomerDto implements ICreateCustomerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsCpfOrCnpj()
  readonly cpf?: string;

  @IsOptional()
  @IsCpfOrCnpj()
  readonly cnpj?: string;

  @IsEnum(CustomerStatus)
  readonly status: CustomerStatus;

  constructor(data: ICreateCustomerDto) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.cpf = data.cpf;
    this.cnpj = data.cnpj;
    this.status = data.status;
  }
}
