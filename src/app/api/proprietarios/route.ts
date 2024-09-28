import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

    // Verificar se o e-mail já está cadastrado
    const existingUser = await prisma.proprietario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

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
        senha: hashedPassword,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
