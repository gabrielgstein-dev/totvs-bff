import { validate } from 'class-validator';
import { CreateContractDto } from '../dto/create-contract.dto';

describe('CreateContractDto', () => {
  it('should validate a valid contract', async () => {
    const dto = new CreateContractDto(
      'Contract Name',
      'Contract Description',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T00:00:00.000Z',
      'Client Name',
      1000,
      'Active',
    );

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate a contract with missing fields', async () => {
    const dto = new CreateContractDto(
      '',
      'Contract Description',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T00:00:00.000Z',
      'Client Name',
      1000,
      'Active',
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not validate a contract with invalid dates', async () => {
    const dto = new CreateContractDto(
      'Contract Name',
      'Contract Description',
      'invalid-date',
      'invalid-date',
      'Client Name',
      1000,
      'Active',
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
