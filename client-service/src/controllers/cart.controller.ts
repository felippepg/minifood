import { ICart } from "src/interfaces/cart";
import { IResponse } from "src/interfaces/response";
import { createCartUseCase, findCartByClientIdUseCase } from "src/usecase/cart";

export const create = async(cart: ICart): Promise<IResponse> => {
  return await createCartUseCase(cart)
}

export const findCartByClientId = async(id: string): Promise<IResponse> => {
  return await findCartByClientIdUseCase(id);
}