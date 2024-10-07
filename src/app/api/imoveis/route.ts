import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Adiciona um novo imóvel (método POST)
export async function POST(request: Request) {
  try {
    const { nomeImovel, tipoPropriedade, endereco, tamanho } = await request.json();

    // Validação básica
    if (!nomeImovel || !tipoPropriedade || !endereco || !tamanho) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Aqui assumimos que o `proprietarioId` será obtido de alguma forma, como do usuário logado.
    // Por exemplo, você pode obter o id do proprietário a partir do contexto de autenticação.
    const proprietarioId = 1; // Substituir isso pela lógica correta para pegar o proprietário autenticado

    // Cria o novo imóvel no banco de dados
    const novoImovel = await prisma.imovel.create({
      data: {
        nomeImovel,
        tipoPropriedade,
        endereco,
        tamanho,
        proprietario: {
          connect: { id: proprietarioId },
        },
      },
    });

    return NextResponse.json(novoImovel, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar imóvel:", error);
    return NextResponse.json({ error: "Erro interno ao cadastrar imóvel." }, { status: 500 });
  }
}

// Lista todos os imóveis (método GET)
export async function GET() {
  try {
    // Busca todos os imóveis no banco de dados
    const imoveis = await prisma.imovel.findMany({
      include: {
        proprietario: true, // Incluir detalhes do proprietário, se necessário
      },
    });

    // Retorna os imóveis como JSON
    return NextResponse.json(imoveis, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return NextResponse.json({ error: "Erro ao buscar imóveis." }, { status: 500 });
  }
}
