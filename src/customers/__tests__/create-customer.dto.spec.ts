import { validate } from 'class-validator';
import { CreateCustomerDto } from '../dto/create-customer.dto';

describe('CreateCustomerDto', () => {
  it('should validate a valid CPF', async () => {
    const dto = new CreateCustomerDto(
      'Test Customer',
      'test@example.com',
      '123456789',
      '123 Test St',
      '11144477735',
      undefined,
    );

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a valid CNPJ', async () => {
    const dto = new CreateCustomerDto(
      'Test Customer',
      'test@example.com',
      '123456789',
      '123 Test St',
      undefined,
      '12345678000195',
    );

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid CPF', async () => {
    const dto = new CreateCustomerDto(
      'Test Customer',
      'test@example.com',
      '123456789',
      '123 Test St',
      'invalid',
      undefined,
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not validate an invalid CNPJ', async () => {
    const dto = new CreateCustomerDto(
      'Test Customer',
      'test@example.com',
      '123456789',
      '123 Test St',
      undefined,
      'invalid',
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
