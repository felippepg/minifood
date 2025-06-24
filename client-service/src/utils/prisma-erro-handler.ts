import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
    case 'P2002':
      return {
        success: false,
        message: 'Já existe um registro com esse valor único',
        code: 'UNIQUE_CONSTRAINT_VIOLATION',
        statusCode: StatusCodes.CONFLICT,
      };
    case 'P2025':
      return {
        success: false,
        message: 'Registro não encontrado',
        code: 'RECORD_NOT_FOUND',
        statusCode: StatusCodes.NOT_FOUND,
      };
    case 'P2003':
      return {
        success: false,
        message: 'Violação de chave estrangeira',
        code: 'FOREIGN_KEY_CONSTRAINT',
        statusCode: StatusCodes.BAD_REQUEST,
      };
    default:
      return {
        success: false,
        message: 'Erro conhecido do Prisma',
        code: `PRISMA_ERROR_${error.code}`,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  return {
    success: false,
    message: 'Erro interno inesperado',
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
};
