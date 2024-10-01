import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Exemplo de Proprietario
  await prisma.proprietario.create({
    data: {
      nomeCompleto: 'Proprietário Teste',
      email: 'proprietario@teste.com',
      telefone: '123456789',
      cpf: '12345678901',
      cnpj: '12345678000100',
      nomeImobiliaria: 'Imobiliária Teste',
      enderecoImobiliaria: 'Rua Exemplo, 123',
      senha: 'hashedpassword', // Use bcrypt para hashear essa senha
    },
  });

  // Exemplo de Funcionario
  await prisma.funcionario.create({
    data: {
      nome: 'Funcionario Teste',
      email: 'funcionario@teste.com',
      telefone: '987654321',
      senha: 'hashedpassword', // Use bcrypt para hashear essa senha
    },
  });

  // Exemplo de Imovel
  await prisma.imovel.create({
    data: {
      nomeImovel: 'Apartamento 101',
      tipoPropriedade: 'Residencial',
      endereco: 'Rua do Imovel, 456',
      tamanho: '120m2',
      proprietarioId: 1, // ID do proprietário criado acima
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
