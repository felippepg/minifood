export interface ICartItem {
  productName: string,
  quantity: number,
  price: number
  notes?: string | null,
  cart_id: number
}
