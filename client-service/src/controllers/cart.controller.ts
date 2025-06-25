import { ICart } from "src/interfaces/cart";
import { IResponse } from "src/interfaces/response";
import { createCartUseCase } from "src/usecase/cart";

export const create = async(cart: ICart): Promise<IResponse> => {
  return await createCartUseCase(cart)
}