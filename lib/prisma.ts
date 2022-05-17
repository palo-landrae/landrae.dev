import { PrismaClient as PrismaClientMongoDB } from '@prisma/generated/mongodb';
import { PrismaClient as PrismaClientMySQL } from '@prisma/generated/mysql';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma_mongodb: PrismaClientMongoDB | undefined;
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma_mysql: PrismaClientMySQL | undefined;
}

const prisma_mongodb = global.prisma_mongodb || new PrismaClientMongoDB();
const prisma_mysql = global.prisma_mysql || new PrismaClientMySQL();

if (process.env.NODE_ENV !== 'production') {
  global.prisma_mongodb = prisma_mongodb;
  global.prisma_mysql = prisma_mysql;
}

export { prisma_mongodb, prisma_mysql };
