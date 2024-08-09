export interface ICreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf?: string;
  cnpj?: string;
}
