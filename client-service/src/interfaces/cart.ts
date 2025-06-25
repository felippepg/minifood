import { ICartItem } from "./cartItem";

export enum CardStatus {
    ACTIVE,
  ABANDONED,
  CHECKEDOUT
}
export interface ICart {
  status: CardStatus,
  client_id: number,
  cart_item: ICartItem[]
}