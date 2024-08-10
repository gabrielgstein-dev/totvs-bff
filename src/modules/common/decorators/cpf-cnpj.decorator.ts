import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const CpfCnpj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    const isCpf = (cpf: string) => cpf.length === 11 && /^\d+$/.test(cpf);
    const isCnpj = (cnpj: string) => cnpj.length === 14 && /^\d+$/.test(cnpj);

    if (isCpf(body.cpf_cnpj)) {
      return { name: body.name, phone: body.phone, cpf: body.cpf_cnpj };
    } else if (isCnpj(body.cpf_cnpj)) {
      return { name: body.name, phone: body.phone, cnpj: body.cpf_cnpj };
    } else {
      throw new BadRequestException('Invalid CPF or CNPJ');
    }
  },
);
