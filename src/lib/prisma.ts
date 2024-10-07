import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Ativa logs detalhados para depuração
});

export { prisma };
