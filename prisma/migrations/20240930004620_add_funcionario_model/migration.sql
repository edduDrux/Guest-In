/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Funcionario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Funcionario` table. All the data in the column will be lost.
  - Made the column `telefone` on table `Funcionario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Funcionario" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "telefone" SET NOT NULL;
