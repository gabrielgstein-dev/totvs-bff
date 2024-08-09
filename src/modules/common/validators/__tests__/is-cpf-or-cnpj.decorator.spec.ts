import { validate } from 'class-validator';
import { IsCpfOrCnpj } from '../is-cpf-or-cnpj.decorator';

class TestDto {
  @IsCpfOrCnpj()
  cpfCnpj: string;

  constructor(cpfCnpj: string) {
    this.cpfCnpj = cpfCnpj;
  }
}

describe('IsCpfOrCnpj', () => {
  it('should validate a valid CPF', async () => {
    const dto = new TestDto('89482569040');
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a valid CNPJ', async () => {
    const dto = new TestDto('89482569040');
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid CPF/CNPJ', async () => {
    const dto = new TestDto('invalid');
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
