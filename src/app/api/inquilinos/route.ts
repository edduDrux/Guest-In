import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

// Adiciona um novo inquilino
export async function POST(request: Request) {
  const { nome, email, telefone, cpf, dataNascimento } = await request.json();

  // Verifica se o e-mail ou CPF já estão cadastrados
  const existingInquilino = await prisma.inquilino.findFirst({
    where: {
      OR: [{ email }, { cpf }],
    },
  });

  if (existingInquilino) {
    return NextResponse.json({ error: "E-mail ou CPF já cadastrado." }, { status: 400 });
  }

  // Gera a senha automaticamente com os primeiros 4 dígitos do CPF
  const senhaGerada = cpf.slice(0, 4);
  const hashedPassword = await bcrypt.hash(senhaGerada, 10);

  // Cria o novo inquilino
  const novoInquilino = await prisma.inquilino.create({
    data: {
      nome,
      email,
      telefone,
      cpf,
      dataNascimento,
      senha: hashedPassword,
      isFirstLogin: true, // Marca que é o primeiro login
    },
  });

  return NextResponse.json(novoInquilino, { status: 201 });
}
