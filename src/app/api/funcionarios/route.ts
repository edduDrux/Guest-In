import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

// Adiciona um novo funcionário
export async function POST(request: Request) {
  const { nome, email, telefone, senha } = await request.json();

  // Verifica se o e-mail já está cadastrado
  const existingFuncionario = await prisma.funcionario.findUnique({
    where: { email },
  });

  if (existingFuncionario) {
    return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 400 });
  }

  // Cria o hash da senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Cria o novo funcionário
  const novoFuncionario = await prisma.funcionario.create({
    data: {
      nome,
      email,
      telefone,
      senha: hashedPassword,
    },
  });

  return NextResponse.json(novoFuncionario, { status: 201 });
}

// Remove um funcionário
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID do funcionário é necessário." }, { status: 400 });
  }

  // Remove o funcionário
  await prisma.funcionario.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: "Funcionário removido com sucesso." }, { status: 200 });
}

// Editar funcionário (opcional se necessário)
export async function PUT(request: Request) {
  const { id, nome, email, telefone, senha } = await request.json();

  const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;

  // Atualiza os dados do funcionário
  const funcionarioAtualizado = await prisma.funcionario.update({
    where: { id: Number(id) },
    data: {
      nome,
      email,
      telefone,
      senha: hashedPassword || undefined,
    },
  });

  return NextResponse.json(funcionarioAtualizado, { status: 200 });
}
