-- CreateTable
CREATE TABLE "Proprietario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "cpf" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nomeImobiliaria" TEXT,
    "enderecoImobiliaria" TEXT,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proprietario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_email_key" ON "Proprietario"("email");
