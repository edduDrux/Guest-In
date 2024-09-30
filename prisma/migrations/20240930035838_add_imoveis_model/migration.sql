-- CreateTable
CREATE TABLE "Imovel" (
    "id" SERIAL NOT NULL,
    "nomeImovel" TEXT NOT NULL,
    "tipoPropriedade" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "proprietarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Proprietario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
