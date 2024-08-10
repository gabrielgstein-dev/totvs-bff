import { validate } from 'class-validator';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ICreateCustomerDto } from '../../common/interfaces/create-customer.dto.interface';

describe('CreateCustomerDto', () => {
  const baseDto: ICreateCustomerDto = {
    name: 'Test Customer',
    phone: '123456789',
    cpf: '89482569040',
  };

  it('should validate a valid customer', async () => {
    const dto = new CreateCustomerDto(baseDto);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
