import { StatusCodes } from 'http-status-codes';
import logger from 'src/infra/logger';
import { IClient } from 'src/interfaces/client';
import {
  deleteClientRepository,
  getAllClientsRepository,
  getClientsByCpf,
  getClientsById,
  saveClientRepository,
  updateClientRepository,
} from 'src/repositories/client.repository';
import { handlePrismaError } from 'src/utils/prisma-erro-handler';

export const getAllClientsUseCase = async () => {
  try {
    logger.info('fetching clients from repository');
    const clients = await getAllClientsRepository();

    if (clients.length === 0) {
      return { success: true, data: null, statusCode: StatusCodes.NO_CONTENT };
    }

    return { success: true, data: clients, statusCode: StatusCodes.OK };
  } catch (error) {
    logger.error('error while fetching clients', error);
    return handlePrismaError(error);
  }
};

export const saveClientUseCase = async (data: IClient) => {
  try {
    logger.info('saving client');
    const client = await saveClientRepository(data);
    return { success: true, data: client, statusCode: StatusCodes.CREATED };
  } catch (error) {
    logger.error('error while saving client', error);
    return handlePrismaError(error);
  }
};

export const getClientByCpfUseCase = async (cpf: string) => {
  try {
    logger.info('fetching client by cpf');
    const client = await getClientsByCpf(cpf);

    if (!client) {
      return { success: true, data: null, statusCode: StatusCodes.NO_CONTENT };
    }

    return { success: true, data: client, statusCode: StatusCodes.OK };
  } catch (error) {
    logger.error('error while fetching client by cpf', error);
    return handlePrismaError(error);
  }
};

export const getClientByIdUseCase = async (id: string) => {
  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return {
      success: false,
      message: 'ID inválido',
      code: 'CLIENTS_INVALID_ID',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  try {
    logger.info('fetching client by id');
    const client = await getClientsById(idNumber);

    if (!client) {
      return { success: true, data: null, statusCode: StatusCodes.NO_CONTENT };
    }

    return { success: true, data: client, statusCode: StatusCodes.OK };
  } catch (error) {
    logger.error('error while fetching client by id', error);
    return handlePrismaError(error);
  }
};

export const updateClientUseCase = async (id: string, data: IClient) => {
  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return {
      success: false,
      message: 'ID inválido',
      code: 'CLIENTS_INVALID_ID',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  try {
    logger.info('updating client');
    const updatedClient = await updateClientRepository(idNumber, data);
    return { success: true, data: updatedClient, statusCode: StatusCodes.OK };
  } catch (error) {
    logger.error('error while updating client', error);
    return handlePrismaError(error);
  }
};

export const deleteClientUseCase = async (id: string) => {
  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return {
      success: false,
      message: 'ID inválido',
      code: 'CLIENTS_INVALID_ID',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  try {
    logger.info('deleting client');
    await deleteClientRepository(idNumber);
    return { success: true, data: null, statusCode: StatusCodes.NO_CONTENT };
  } catch (error) {
    logger.error('error while deleting client', error);
    return handlePrismaError(error);
  }
};
