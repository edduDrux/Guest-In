import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      nomeCompleto,
      email,
      telefone,
      cpf,
      cnpj,
      nomeImobiliaria,
      enderecoImobiliaria,
      senha,
    } = data;

    // Verificar se o e-mail, CPF ou CNPJ já estão cadastrados
    const existingUser = await prisma.proprietario.findFirst({
      where: {
        OR: [
          { email },
          { cpf },
          { cnpj },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'E-mail, CPF ou CNPJ já cadastrados.' }, { status: 400 });
    }

    // Salvando no banco de dados
    const proprietario = await prisma.proprietario.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        cpf,
        cnpj,
        nomeImobiliaria,
        enderecoImobiliaria,
        senha,
      },
    });

    return NextResponse.json({ success: true, proprietario }, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar proprietário:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar proprietário. Tente novamente.' }, { status: 500 });
  }
}
