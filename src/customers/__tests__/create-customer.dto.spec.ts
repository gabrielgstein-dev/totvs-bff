import { validate } from 'class-validator';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerStatus } from '../../common/enums/customer-status.enum';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

describe('CreateCustomerDto', () => {
  const baseDto: ICreateCustomerDto = {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '123456789',
    address: '123 Test St',
    status: CustomerStatus.DENTRO_DO_PRAZO,
  };

  it('should validate a valid CPF', async () => {
    const dto = new CreateCustomerDto({
      ...baseDto,
      cpf: '11144477735',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a valid CNPJ', async () => {
    const dto = new CreateCustomerDto({
      ...baseDto,
      cnpj: '12345678000195',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid CPF', async () => {
    const dto = new CreateCustomerDto({
      ...baseDto,
      cpf: 'invalid',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not validate an invalid CNPJ', async () => {
    const dto = new CreateCustomerDto({
      ...baseDto,
      cnpj: 'invalid',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
