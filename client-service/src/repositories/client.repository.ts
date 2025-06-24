import { prisma } from '../infra/client';
import { IClient } from '../interfaces/client';

export const getAllClientsRepository = async () => {
  return await prisma.client.findMany();
};

export const getClientsById = async (id: number) => {
  return await prisma.client.findUnique(
    {
      where: {
        id,
      },
    },
  );
};

export const getClientsByCpf = async (cpf: string) => {
  return await prisma.client.findUnique(
    {
      where: {
        cpf,
      },
    },
  );
};

export const deleteClientRepository = async (id: number) => {
  await prisma.client.delete({
    where: {
      id,
    },
  });
};

export const saveClientRepository = async (client: IClient) => {
  return await prisma.client.create({
    data: {
      firstname: client.firstname,
      lastname: client.lastname,
      cpf: client.cpf,
    },
  });

  
};

export const updateClientRepository = async (id: number, client: IClient) => {
  return await prisma.client.update({
    data: {
      firstname: client.firstname,
      lastname: client.lastname,
      cpf: client.cpf,
    },where: {
      id: id,
    },
  });
};