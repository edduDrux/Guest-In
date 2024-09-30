import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Adiciona um novo imóvel
export async function POST(request: Request) {
  const { nomeImovel, tipoPropriedade, endereco, tamanho, proprietarioId } = await request.json();

  // Validações adicionais, se necessário

  // Cria o novo imóvel no banco de dados
  const novoImovel = await prisma.imovel.create({
    data: {
      nomeImovel,
      tipoPropriedade,
      endereco,
      tamanho,
      proprietario: {
        connect: { id: proprietarioId }, // Conectando o imóvel com o proprietário selecionado
      },
    },
  });

  return NextResponse.json(novoImovel, { status: 201 });
}
