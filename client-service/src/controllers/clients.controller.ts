import { IClient } from 'src/interfaces/client';
import { IResponse } from 'src/interfaces/response';
import { deleteClientUseCase, getAllClientsUseCase, getClientByCpfUseCase, getClientByIdUseCase, saveClientUseCase, updateClientUseCase } from '../usecase/clients';


export const getClients = async (): Promise<IResponse> => {
  return await getAllClientsUseCase();
};

export const saveClient = async (data: IClient):Promise<IResponse> => {
  return await saveClientUseCase(data);
};

export const getClientByCpf = async (cpf: string):Promise<IResponse> => {
  return await getClientByCpfUseCase(cpf);
};

export const getClientById = async (id: string):Promise<IResponse> => {
  return await getClientByIdUseCase(id);
};

export const updateClient = async (id: string, data: IClient):Promise<IResponse> => {
  return await updateClientUseCase(id, data);
};

export const deleteClient = async (id: string):Promise<IResponse> => {
  return await deleteClientUseCase(id);
};