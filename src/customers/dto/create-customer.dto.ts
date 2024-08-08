import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { IsCpfOrCnpj } from '../../common/validators/is-cpf-or-cnpj.decorator';

export class CreateCustomerDto {
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

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf?: string,
    cnpj?: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.cpf = cpf;
    this.cnpj = cnpj;
  }
}
