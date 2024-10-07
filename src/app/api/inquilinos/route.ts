import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Adiciona um novo inquilino
export async function POST(request: Request) {
  try {
    const { nome, email, telefone, cpf, dataNascimento } = await request.json();

    // Validação básica: Verifica se os campos obrigatórios estão presentes
    if (!nome || !email || !cpf || !dataNascimento) {
      return NextResponse.json(
        { error: "Nome, e-mail, CPF e data de nascimento são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se o e-mail ou CPF já estão cadastrados
    const existingInquilino = await prisma.inquilino.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (existingInquilino) {
      return NextResponse.json(
        { error: "E-mail ou CPF já cadastrado." },
        { status: 400 }
      );
    }

    // Verifica se o CPF tem pelo menos 4 dígitos
    if (cpf.length < 4) {
      return NextResponse.json(
        { error: "O CPF precisa ter pelo menos 4 dígitos para gerar a senha." },
        { status: 400 }
      );
    }

    // Gera uma senha temporária com os primeiros 4 dígitos do CPF
    const senhaGerada = cpf.slice(0, 4);

    // Convertendo o `dataNascimento` para um objeto Date
    const dataNascimentoDate = new Date(dataNascimento);

    // Cria o novo inquilino no banco de dados
    const novoInquilino = await prisma.inquilino.create({
      data: {
        nome,
        email,
        telefone,
        cpf,
        dataNascimento: dataNascimentoDate, // Enviando o objeto Date
        senha: senhaGerada, // Armazena a senha diretamente
        isFirstLogin: true, // Marca como primeiro login para forçar redefinição de senha
      },
    });

    return NextResponse.json(novoInquilino, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar inquilino:", error.message, error.stack);
    return NextResponse.json(
      { error: "Erro interno ao cadastrar inquilino." },
      { status: 500 }
    );
  }
}
