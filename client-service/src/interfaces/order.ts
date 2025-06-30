export interface Order {
  orderClientId: number,
  orderItens: OrderItens[]
}

export interface OrderItens {
  productName: string,
  quantity: number,
  price: number
  notes?: string | null,
}

