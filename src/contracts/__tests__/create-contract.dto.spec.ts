import { validate } from 'class-validator';
import { CreateContractDto } from '../dto/create-contract.dto';
import { ContractStatus } from '../../common/enums/contract-status.enum';

describe('CreateContractDto', () => {
  const baseDto = {
    number: '12345',
    acquisitionDate: '2024-01-01T00:00:00.000Z',
    value: 1000,
    status: ContractStatus.ON_SCHEDULE,
    customer: 1,
  };

  it('should validate a valid contract', async () => {
    const dto = new CreateContractDto(baseDto);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
